export type ComplexNumber = {
    re: number;
    im: number;
};

export type Context = Record<string, number | ComplexNumber>;

export type Variable = {
    id: string;
    name: string;
    value: number | ComplexNumber;
};

export type EvalType = "complex" | "number" | "error";

export type EvalResult = {
    result: number | ComplexNumber | null;
    formattedResult: string;
    type: EvalType;
    variable: Variable | null;
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
    // Markdown description of how to use the preset
    description: string;
};
