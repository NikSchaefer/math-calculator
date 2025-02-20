export type ComplexNumber = {
    re: number;
    im: number;
};

export type Variable = {
    id: string;
    name: string;
    value: number | ComplexNumber;
};

export type Calculator = {
    id: string;
    latex: string;
};

export type Preset = {
    id: string;
    name: string;
    calculators: Calculator[];
};
