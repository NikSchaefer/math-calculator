export function convertArraysToMatrices(latex: string): string {
    // Stack to keep track of nested brackets
    const stack: number[] = [];
    let result = "";
    let i = 0;

    while (i < latex.length) {
        // Check for \left[ sequence
        if (latex.slice(i).startsWith("\\left[")) {
            stack.push(i);
            result += "\\begin{bmatrix}";
            i += 6; // Skip past \left[
        }
        // Check for \right] sequence
        else if (latex.slice(i).startsWith("\\right]")) {
            if (stack.length > 0) {
                stack.pop();
                result += "\\end{bmatrix}";
                i += 7; // Skip past \right]
            } else {
                // Unmatched \right], keep as is
                result += latex[i];
                i++;
            }
        }
        // Handle other characters
        else {
            result += latex[i];
            i++;
        }
    }

    return result.replaceAll(",", "&");
}
