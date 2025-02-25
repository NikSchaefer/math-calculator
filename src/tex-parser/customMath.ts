/* eslint-disable @typescript-eslint/no-explicit-any */
import { create, all, MathJsInstance, sort } from "mathjs";
// import mathjsSimpleIntegral from "mathjs-simple-integral";

// use BigNumber to reduce floating-point rounding errors
const math = create(all, {
    number: "BigNumber",
    precision: 64,
}) as MathJsInstance;

// Configuration for angle mode
const config = {
    angles: "rad", // 'rad' or 'deg'
};

// Create angle-aware trig functions
const replacements: Record<string, any> = {};
const trigFunctions = ["sin", "cos", "tan", "sec", "cot", "csc"];
const arcTrigFunctions = [
    "arcsin",
    "arccos",
    "arctan",
    "arcsec",
    "arccot",
    "arccsc",
];

trigFunctions.forEach((name) => {
    const originalFn = math[name as keyof MathJsInstance];

    const fnNumber = (x: any) => {
        // Convert degrees to radians if in deg mode
        return config.angles === "deg"
            ? originalFn(math.multiply(x, math.divide(math.pi, 180)))
            : originalFn(x);
    };

    replacements[name] = math.typed(name, {
        "number | BigNumber": fnNumber,
        "Array | Matrix": (x: any) => math.map(x, fnNumber),
    });
});

// Add inverse trig functions
arcTrigFunctions.forEach((name) => {
    const originalFn = math[name as keyof MathJsInstance];

    const fnNumber = (x: any) => {
        const result = originalFn(x);
        // Convert result from radians to degrees if in deg mode
        return config.angles === "deg"
            ? math.multiply(result, math.divide(180, math.pi))
            : result;
    };

    replacements[name] = math.typed(name, {
        "number | BigNumber": fnNumber,
        "Array | Matrix": (x: any) => math.map(x, fnNumber),
    });
});

// Import the replacements first
math.import(replacements, { override: true });

// Additional functions to be passed to the scope of math.evaluate(scope)
// (not defined in mathjs)
const mathImport = {
    lastFn: "",
    lastArgs: [],
    eigenvalues: (matrix: any) => math.eigs(matrix).values,
    // @ts-expect-error not sure yet lol
    eigenvectors: (matrix: any) => math.eigs(matrix).vectors,
    comp: (a: any, b: any) => math.divide(math.dot(a, b), math.norm(a)), // component of b along a
    proj: (a: any, b: any) =>
        math.multiply(
            math.divide(a, math.norm(a)),
            math.divide(math.dot(a, b), math.norm(a))
        ), // projection of b along a
    setAngleMode: (mode: "rad" | "deg") => {
        config.angles = mode;
    },
    getAngleMode: () => config.angles,
    sort: (array: any) => {
        const sorted = sort(array.toArray().flat(), "asc");
        return sorted;
    },
    len: (array: any) => {
        return array.toArray().flat().length;
    },
    // TODO: Add integration
    // int: (f: any, a: any, b: any) => mathjsSimpleIntegral(f, a, b),
    total: (array: any) => {
        return array
            .toArray()
            .flat()
            .reduce((a: any, b: any) => a + b, 0);
    },
    rand: (n: number, m: number) => {
        return math.random(n, m);
    },
    randn: (n: number, m: number) => {
        return math.randomInt(n, m);
    },
};

math.import(mathImport, {
    override: true,
});

export default math;
