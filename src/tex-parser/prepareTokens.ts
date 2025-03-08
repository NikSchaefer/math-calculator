export function prepareTokens(latex: string): string {
  latex = addZeroesToDotNumbers(latex);
  return convertMatrices(latex);
}

// Will replace things like .4 with 0.4, but only if there's not a number before the dot
function addZeroesToDotNumbers(latex: string): string {
  return latex.replace(/(?<!\d)(\.\d+)/g, (match) => match.padStart(match.length + 1, '0'));
}

// Will replace brackets with matrix environments
function convertMatrices(latex: string): string {
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
