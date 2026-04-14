import { evaluateTex } from "@/tex-parser";
import {
    ComplexNumber,
    Variable,
    Context,
    Calculator,
    ComputedCalculator,
    EvalResult,
} from "@/types";
import {
    formatNumberResult,
    computeNumberResult,
    formatComplexNumber,
    computeComplexNumberResult,
    formatMatrixResult,
    computeMatrixResult,
    computeArrayResult,
    formatArrayResult,
    getTypeOfResult,
} from "./format-utils";
import { Matrix } from "mathjs";

function friendlyError(error: unknown): string {
    if (!(error instanceof Error)) return "Error";
    const msg = error.message;

    // Our custom parser errors: "lexeme at pos: description"
    if (error.name === "ParseError") {
        const match = msg.match(/.+ at \d+:\s*(.+)/);
        return match ? `Syntax: ${match[1]}` : "Syntax error";
    }

    if (/undefined symbol/i.test(msg)) {
        const sym = msg.match(/undefined symbol\s+(\S+)/i)?.[1];
        return sym ? `'${sym}' is not defined` : "Undefined variable";
    }

    if (/divide by zero|division by zero/i.test(msg)) {
        return "Division by zero";
    }

    if (/dimension mismatch/i.test(msg)) {
        return "Matrix size mismatch";
    }

    if (/unexpected type/i.test(msg)) {
        return "Wrong argument type";
    }

    if (/out of bounds/i.test(msg)) {
        return msg;
    }

    return msg.length > 60 ? msg.slice(0, 57) + "…" : msg;
}

function extractVariables(scope: Context): Variable[] {
    if (!scope || scope.length === 0) return [];
    const keys = Object.keys(scope);
    return keys.map((key) => ({
        id: key,
        name: key,
        value: scope[key],
    }));
}

export function computeCalculator(
    calculator: Calculator,
    context?: Context
): ComputedCalculator {
    const computed: ComputedCalculator = {
        ...calculator,
    } as ComputedCalculator;

    const isMultiple = calculator.latex.includes(";");

    if (isMultiple) {
        const split = calculator.latex.split(";");

        const results: EvalResult[] = [];

        for (const latex of split) {
            results.push(computeExpression(latex, context));
        }

        return {
            ...computed,
            results,
        };
    }

    // Compute the expression normally
    return {
        ...computed,
        results: [computeExpression(calculator.latex, context)],
    };
}

export function computeExpression(
    latex: string,
    context?: Context
): EvalResult {
    const computedResult: EvalResult = {
        result: null,
        formattedResult: "",
        type: "error",
        variables: [],
    };

    if (latex.trim() === "") {
        return computedResult;
    }

    // First we check if there are any variables in the input that we can use elsewhere
    if (context) {
        computedResult.variables = extractVariables(context);
    }

    try {
        // Then we evaluate the input with the context
        const { evaluated } = evaluateTex(latex, context);
        const type = getTypeOfResult(evaluated);
        computedResult.type = type;

        switch (type) {
            case "complex":
                computedResult.formattedResult = formatComplexNumber(
                    evaluated as ComplexNumber
                );
                computedResult.result = computeComplexNumberResult(
                    evaluated as ComplexNumber
                );
                break;
            case "matrix":
                computedResult.formattedResult = formatMatrixResult(
                    evaluated as Matrix
                );
                computedResult.result = computeMatrixResult(
                    evaluated as Matrix
                );
                break;
            case "array":
                computedResult.formattedResult = formatArrayResult(
                    evaluated as Array<unknown>
                );
                computedResult.result = computeArrayResult(
                    evaluated as Array<unknown>
                );
                break;
            case "number":
                computedResult.formattedResult = formatNumberResult(
                    evaluated as number
                );
                computedResult.result = computeNumberResult(
                    evaluated as number
                );
                break;
            case "function":
                computedResult.formattedResult = "-";
                computedResult.result = null;
                break;
        }
        return computedResult;
    } catch (error) {
        console.log(error);
        return {
            ...computedResult,
            formattedResult: friendlyError(error),
            result: null,
            type: "error",
        };
    }
}
