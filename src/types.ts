export type ComplexNumber = {
    re: number;
    im: number;
};

export type Context = Record<string, number | ComplexNumber>;

export type Variable = {
    id: string;
    name: string;
    value: number | ComplexNumber;
    description?: string;
};

export type EvalType = "complex" | "number" | "matrix" | "error";

export type EvalResult = {
    result: number | ComplexNumber | Array<unknown> | null;
    formattedResult: string;
    type: EvalType;
    variables: Variable[];
};

export type Calculator = {
    id: string;
    latex: string;
    preview?: string;
};

export type ComputedCalculator = Calculator & EvalResult;

export type Preset = {
    id: string;
    name: string;
    categories: string[];
    calculators: Calculator[];
    inputVariables: string[];
    // Markdown description of how to use the preset
    description: string;
};
