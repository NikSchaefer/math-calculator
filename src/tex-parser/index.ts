/* eslint-disable @typescript-eslint/no-explicit-any */
import tokenizeTex from "./tokenizeTex";
import parseTokens from "./parseTokens";

// scope used by evaluateTex to resolve identifiers
type Scope = { [key: string]: any };

/**
 * Parse a TeX math string into a MathJS expression tree.
 * @returns Returns an object containing the root node of a MathJS expression tree
 *          and variables that need to be defined.
 */
function parseTex(texStr: string, scope?: Scope) {
    return parseTokens(tokenizeTex(texStr), scope);
}

/**
 * Evaluate a TeX math string, returning the result as a MathJS MathType.
 */
function evaluateTex(texStr: string, scope?: Scope) {
    const root = parseTex(texStr, scope);
    const evaluated = root.evaluate(scope);
    return { evaluated, scope, root };
}

export { parseTex, evaluateTex };
export type { Scope };
