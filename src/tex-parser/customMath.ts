/* eslint-disable @typescript-eslint/no-explicit-any */
import { create, all, MathJsInstance } from "mathjs";
// import mathjsSimpleIntegral from "mathjs-simple-integral";

// use BigNumber to reduce floating-point rounding errors
const math = create(all, {
    number: "BigNumber",
    precision: 64,
}) as MathJsInstance;

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
    // TODO: Add integration
    // int: (f: any, a: any, b: any) => mathjsSimpleIntegral(f, a, b),
};

math.import(mathImport, {
    override: true,
});

export default math;
