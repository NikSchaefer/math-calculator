export function prepareTokens(latex: string): string {
  latex = stripSpacingCommands(latex);
  latex = addZeroesToDotNumbers(latex);
  return convertMatrices(latex);
}

// Strip LaTeX thin-space and spacing commands used as visual separators
// (e.g. \, before dx in integrals, produced by MathQuill)
function stripSpacingCommands(latex: string): string {
  return latex.replace(/\\[,;:!]/g, " ");
}

// Will replace things like .4 with 0.4, but only if there's not a number before the dot
function addZeroesToDotNumbers(latex: string): string {
  return latex.replace(/(?<!\d)(\.\d+)/g, (match) => match.padStart(match.length + 1, '0'));
}

// Converts \left[...\right] to plain [...] so they are parsed uniformly as
// 1D array literals or index access by the token parser.
// \begin{bmatrix}...\end{bmatrix} (typed explicitly) continues to produce 2D matrices.
function convertMatrices(latex: string): string {
  return latex
    .replaceAll("\\left[", "[")
    .replaceAll("\\right]", "]")
    .replaceAll(",", "&");
}
