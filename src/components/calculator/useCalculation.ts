import { useState } from "react";
import { evaluateTex } from "tex-math-parser";
import { ComplexNumber, Variable } from "@/types";
import { formatNumber, formatComplexNumber } from "./format-utils";
import { useCalculator } from "@/app/context";

export const useCalculation = (id: string, variables: Variable[]) => {
    const [result, setResult] = useState("");
    const { addVariable } = useCalculator();

    // Calculate the result of the input
    const calculate = (input: string) => {
        // If the input is empty, set the result to empty
        if (!input.trim()) {
            setResult("");
            return;
        }

        try {
            const assignmentMatch = input.match(
                /^([a-zA-Z][a-zA-Z0-9]*)\s*=(.+)$/
            );

            // If the input is an assignment, evaluate the expression and store the result in variables
            if (assignmentMatch && input.includes("=")) {
                const [, variableName, expression] = assignmentMatch;
                const variablesAsObject = Object.fromEntries(
                    variables.map((v) => [v.name, v.value])
                );
                const { evaluated } = evaluateTex(
                    expression.trim(),
                    variablesAsObject
                );

                // Store the result in variables using the prop setter
                const value =
                    typeof evaluated === "object"
                        ? evaluated
                        : Number(evaluated);
                addVariable({
                    id,
                    name: variableName,
                    value,
                });

                // Show the result
                if (
                    typeof evaluated === "object" &&
                    "im" in evaluated &&
                    "re" in evaluated
                ) {
                    setResult(formatComplexNumber(evaluated as ComplexNumber));
                } else {
                    setResult(formatNumber(Number(evaluated)));
                }
                // If the input is not an assignment, evaluate the expression
            } else {
                // Normal expression evaluation
                const variablesAsObject = Object.fromEntries(
                    variables.map((v) => [v.name, v.value])
                );
                const { evaluated } = evaluateTex(input, variablesAsObject);

                if (
                    typeof evaluated === "object" &&
                    "im" in evaluated &&
                    "re" in evaluated
                ) {
                    setResult(formatComplexNumber(evaluated as ComplexNumber));
                } else {
                    const numResult = Number(evaluated);
                    setResult(formatNumber(numResult));
                }
            }
        } catch (error) {
            if (
                error instanceof Error &&
                error.message.includes("expected primary")
            ) {
                setResult("");
            } else {
                setResult("Err");
            }
        }
    };

    return { result, calculate };
};
