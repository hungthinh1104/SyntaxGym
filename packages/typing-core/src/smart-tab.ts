export function getSmartTabKeystrokes(source: string, cursorIndex: number): string[] {
  let isIndentation = true;
  for (let i = cursorIndex - 1; i >= 0; i--) {
    if (source[i] === "\n") break;
    if (source[i] !== " " && source[i] !== "\t") {
      isIndentation = false;
      break;
    }
  }

  if (!isIndentation) {
    return [];
  }

  const nextChar = source[cursorIndex];
  
  if (nextChar === "\t") {
    return ["\t"];
  }

  if (nextChar === " ") {
    let spacesToType = 0;
    for (let i = cursorIndex; i < source.length; i++) {
      if (source[i] === " ") {
        spacesToType++;
      } else {
        break;
      }
    }
    return new Array(spacesToType).fill(" ");
  }

  return [];
}
