export function createBoard(width = 10, height = 10, minesCount = 10, firstClickX = 0, firstClickY = 0) {
  const fields = Array(height).fill().map(() => Array(width).fill(0));
  const possibleMinesPositions = [];
  for (let y = 0; y < height; y++)
    for (let x = 0; x < width; x++)
      if (x !== firstClickX || y !== firstClickY)
        possibleMinesPositions.push([y, x]);

  for (let i = 0; i < minesCount; i++) {
    const [y, x] = possibleMinesPositions
      .splice(Math.floor(Math.random() * possibleMinesPositions.length), 1)[0];
    fields[y][x] = -1;
  }

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (fields[y][x] === -1)
        continue;
      for (let dy = -1; dy < 2; dy++) {
        if (y + dy < 0 || y + dy >= height)
          continue;
        for (let dx = -1; dx < 2; dx++) {
          if (x + dx < 0 || x + dx >= width)
            continue;
          if (dx === 0 && dy === 0)
            continue;
          if (fields[y + dy][x + dx] === -1) {
            fields[y][x]++;
          }
        }
      }
    }
  }

  return fields;
}