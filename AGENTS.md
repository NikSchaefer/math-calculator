# AGENTS.md — Math Calculator

Context document for AI agents working in this repository.

---

## Project Overview

A keyboard-first scientific calculator that accepts LaTeX math input and evaluates it using a custom TeX parser backed by mathjs with 64-digit BigNumber precision. Built with Next.js 16 / React 19 / TypeScript.

**Run dev server:** `bun dev`
**Run tests:** `bun test`
**Lint:** `bun lint`

---

## Repository Map

```
src/
├── app/
│   ├── context.tsx          # Global state: calculators[], angleMode, setAngleMode
│   ├── page.tsx             # Root page, keyboard shortcuts
│   └── _content/
│       └── controls.tsx     # DEG/RAD toggle button
├── components/
│   └── calculator/
│       ├── calculate.ts     # computeCalculator / computeExpression (two-pass eval)
│       ├── format-utils.ts  # getTypeOfResult, formatNumberResult, formatComplexNumber
│       ├── input.tsx        # MathQuill LaTeX input
│       └── results.tsx      # Result display
├── data/
│   ├── constants.ts         # Physical constants injected into every evaluation scope
│   └── formulas.ts          # Preset formula library shown in command palette
├── tex-parser/
│   ├── index.ts             # Public API: parseTex(), evaluateTex()
│   ├── tokenizeTex.ts       # Lexer: LaTeX string → Token[]
│   ├── prepareTokens.ts     # Pre-processing: strip spacing cmds, fix .4→0.4, commas→&
│   ├── parseTokens.ts       # Recursive-descent parser: Token[] → MathJS AST
│   ├── customMath.ts        # mathjs instance + all custom functions (single export)
│   ├── Token.ts             # TokenType enum, lexemeToType map, typeToOperation map
│   ├── specialNodes.ts      # SummationNode, IntegralNode (custom eval nodes)
│   ├── lastFunctionNode.ts  # Tracks last-called function name
│   └── ParseError.ts        # Parser error class
├── types.ts                 # Shared TypeScript types
└── __tests__/
    ├── customMath.test.ts   # Tests for all custom math functions
    ├── parser.test.ts       # End-to-end parser / evaluateTex tests
    └── formatUtils.test.ts  # Tests for result formatting
```

---

## Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 6 (strict) |
| Math engine | mathjs ^15 with BigNumber, precision 64 |
| Input | react-mathquill (MathQuill LaTeX editor) |
| Package manager | bun |
| Test runner | `bun test` (built-in, no extra dep) |
| Styling | Tailwind CSS v4 |

---

## Math Engine (`src/tex-parser/customMath.ts`)

This is the single most important file. It exports one thing: a configured mathjs instance.

### BigNumber Configuration

```ts
const math = create(all, { number: "BigNumber", precision: 64 });
```

**All numeric literals in evaluated expressions become BigNumbers.** This is intentional for precision. Every custom function must return BigNumbers, not plain JS floats.

### Critical Rule: Never Use Plain JS Arithmetic in Custom Functions

mathjs throws if you try to convert a plain JS float with >15 significant digits to BigNumber:

```
TypeError: Cannot implicitly convert a number with >15 significant digits to BigNumber
```

This silently lurks anywhere a JS native operation (like `Math.sqrt`, `**`, `/`) produces a decimal result that is later used in a BigNumber expression.

**Wrong:**
```ts
// math.abs(complex) returns a plain JS float — breaks in expressions
return math.abs(complexNumber);

// JS division produces 0.3333333333333333 (16 digits) — breaks
return math.asin(1 / x);

// JS exponentiation — breaks
return math.sqrt(re ** 2 + im ** 2);
```

**Correct:**
```ts
// Stay in BigNumber land throughout
const sq = (v: any) => math.pow(math.bignumber(v), 2);
return math.sqrt(math.add(sq(re), sq(im)));

// Use math.divide for reciprocals
return math.asin(math.divide(math.bignumber(1), x));

// For complex arg, use atan2 not math.arg
return math.atan2(math.bignumber(z.im), math.bignumber(z.re));
```

### Angle Mode

A module-level `config` object controls the current mode:

```ts
const config = { angles: "rad" }; // or "deg"
```

- **Forward trig** (`sin`, `cos`, `tan`, `sec`, `cot`, `csc`): overridden at module init to convert degrees→radians when in deg mode before calling the original function.
- **Inverse trig** (`arcsin` etc.): built via `arcTrigTyped()` which converts the result radians→degrees when in deg mode.
- `setAngleMode(mode)` / `getAngleMode()` are exported as mathjs-imported functions.
- In `context.tsx`, `setAngleMode` is called synchronously in the React state setter — **not** inside `useMemo` — so `config.angles` is always correct before the memo recalculates.

### Adding a New Custom Function

1. **Implement** in `mathImport` in `customMath.ts`. Use `math.bignumber(x)` for all inputs; return BigNumbers.
2. **Register the token** in `Token.ts`:
   - Add `MyFn` to the `TokenType` enum.
   - Add `myfn: TokenType.MyFn` to `lexemeToType` (the string the user types).
   - Add `[TokenType.MyFn]: "myfn"` to `typeToOperation`.
3. **Handle in the parser** in `parseTokens.ts`:
   - Add `case TokenType.MyFn:` to the big switch in `createMathJSNode` (falls through to `return new FunctionNode(fn, children)`).
   - If the function needs no special argument parsing, that's it. The function is accessed via `\operatorname{myfn}` in LaTeX input.
4. **Write tests** in `src/__tests__/customMath.test.ts` and `parser.test.ts`.

> Functions accessed via `\operatorname{name}` go through `nextCustomFunc()` in the parser, which correctly routes them through `createMathJSNode`. Functions like `\sin` have their own dedicated `TokenType` and a case in `nextPrimary()`.

---

## TeX Parser Pipeline

```
LaTeX string
    ↓ prepareTokens()     strip \, spacing; .4 → 0.4; commas → &; \left[→[
    ↓ tokenizeTex()       produce Token[] with type + lexeme
    ↓ parseTokens()       recursive descent → mathjs MathNode AST
    ↓ node.evaluate(scope) mathjs evaluates the AST
```

### Parser Grammar (simplified)

```
expr    = term ((+ | -) term)*
        | VARIABLE = expr               (assignment)
        | VARIABLE(params) = expr       (function definition)

term    = factor ((*  | /) factor | primary)*   (implicit mult allowed)
factor  = -? power
power   = primary (^ primary)*
primary = grouping | frac | function | NUMBER | VARIABLE | matrix | sum | integral | array
```

### Absolute Value Notation

Bare `|expr|` has a grammar ambiguity (the closing `|` looks like the start of a new implicit-mult primary). Always use `\left|expr\right|` in tests and when constructing LaTeX programmatically.

---

## Evaluation Pipeline (`src/components/calculator/calculate.ts`)

`computeCalculator` runs a **two-pass** system:

1. **Pass 1** — evaluate all rows without a shared context to discover variable assignments.
2. **Pass 2** — re-evaluate with a combined context (all assigned variables + physical constants from `src/data/constants.ts`) and thread `ans` between rows.

`computeExpression` calls `evaluateTex`, inspects the result type via `getTypeOfResult`, then dispatches to the appropriate formatter.

### Result Types (`getTypeOfResult`)

| Type | Detected by |
|---|---|
| `"function"` | `typeof === "function"` |
| `"array"` | `Array.isArray` |
| `"complex"` | object with `re` and `im` properties |
| `"matrix"` | object with `_data` property (mathjs Matrix) |
| `"number"` | everything else, including BigNumbers (`isBigNumber` guard is explicit) |

---

## State Management (`src/app/context.tsx`)

- `calculators: Calculator[]` — array of `{ id, latex }` rows
- `angleMode: "deg" | "rad"` — the React state; the math engine is synced synchronously inside the `setAngleMode` wrapper, **not** inside `useMemo`
- `combinedContext` — the merged variable + constants scope threaded through the two-pass calculation
- `computedCalculators` — memoized result, recomputed when `calculators` or `angleMode` changes

---

## Types (`src/types.ts`)

```ts
ComplexNumber = { re: number; im: number }
Context       = Record<string, number | ComplexNumber>
Variable      = { id, name, value, description? }
EvalType      = "complex" | "number" | "matrix" | "array" | "function" | "error"
EvalResult    = { result, formattedResult, type, variables }
Calculator    = { id?, latex, preview? }
Preset        = { name, categories, calculators, inputVariables, description }
```

---

## Tests

Tests live in `src/__tests__/` and use bun's built-in test runner (`bun:test`).

```
bun test                  # run all tests
bun test customMath       # run one file
```

### Test conventions

- `beforeEach` resets angle mode to `"rad"` to prevent cross-test pollution.
- Use `Number(result)` (aliased as `num()`) to compare BigNumber results with `toBeCloseTo`.
- Regression tests for the >15 sig-digit bug: call `.not.toThrow()` on `math.multiply(result, 2)` after calling any custom function that touches complex or irrational values.
- Parser tests go through `evaluateTex(latex, scope?)`. Pass a scope object to inject variable values.

---

## Physical Constants

`src/data/constants.ts` exports a flat `constants` object injected into every evaluation scope as low-priority defaults (user-defined variables override them). Variable names match the LaTeX subscript notation used in MathQuill, e.g. `g`, `N_A`, `k_e`, `h_P`, `c_{light}`.

---

## Formulas / Presets

`src/data/formulas.ts` exports `Preset[]` shown in the command palette. Each preset has:
- `calculators`: array of `{ latex, preview }` rows pre-filled into the calculator
- `inputVariables`: variable names the user is expected to set before the preset runs
- `categories`: used for filtering in the command palette

---

## Known Limitations / Gotchas

- **`|x|` ambiguity**: bare bar notation breaks with non-trivial expressions. Use `\left|x\right|`.
- **Complex numbers**: mathjs `Complex` objects always use plain JS floats for `.re` / `.im` regardless of BigNumber mode. Any custom function receiving a complex must manually call `math.bignumber(z.re)` / `math.bignumber(z.im)` before doing arithmetic.
- **`math.arg(complex)`** returns a plain JS float. Use `math.atan2(bignumber(z.im), bignumber(z.re))` instead.
- **`arcTrigTyped` pre-built**: the typed function objects for all six inverse-trig functions are constructed once at module init. Do not call `arcTrigTyped(...)` inside a per-call lambda.
- **No test for UI components**: the test suite covers the math engine, parser, and formatting utilities only.
