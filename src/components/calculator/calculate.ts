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
        }
        return computedResult;
    } catch (error) {
        console.log(error);
        return {
            ...computedResult,
            formattedResult: "Error",
            result: null,
            type: "error",
        };
    }
}
