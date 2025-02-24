import { evaluateTex } from "@/tex-parser";
import {
    ComplexNumber,
    Variable,
    Context,
    Calculator,
    ComputedCalculator,
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
    const computedCalculator: ComputedCalculator = {
        ...calculator,
        result: null,
        formattedResult: "",
        type: "error",
        variables: [],
    };

    if (calculator.latex.trim() === "") {
        return computedCalculator;
    }

    // First we check if there are any variables in the input that we can use elsewhere
    if (context) {
        computedCalculator.variables = extractVariables(context);
    }

    try {
        // Then we evaluate the input with the context
        const { evaluated } = evaluateTex(calculator.latex, context);
        const type = getTypeOfResult(evaluated);
        computedCalculator.type = type;

        switch (type) {
            case "complex":
                computedCalculator.formattedResult = formatComplexNumber(
                    evaluated as ComplexNumber
                );
                computedCalculator.result = computeComplexNumberResult(
                    evaluated as ComplexNumber
                );
                break;
            case "matrix":
                computedCalculator.formattedResult = formatMatrixResult(
                    evaluated as Matrix
                );
                computedCalculator.result = computeMatrixResult(
                    evaluated as Matrix
                );
                break;
            case "array":
                computedCalculator.formattedResult = formatArrayResult(
                    evaluated as Array<unknown>
                );
                computedCalculator.result = computeArrayResult(
                    evaluated as Array<unknown>
                );
                break;
            case "number":
                computedCalculator.formattedResult = formatNumberResult(
                    evaluated as number
                );
                computedCalculator.result = computeNumberResult(
                    evaluated as number
                );
                break;
        }
        return computedCalculator;
    } catch (error) {
        console.log(error);
        return {
            ...computedCalculator,
            formattedResult: "Error",
            result: null,
            type: "error",
        };
    }
}
