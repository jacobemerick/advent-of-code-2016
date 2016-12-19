const Puzzle = require('@thefotios/advent_puzzle');

const p = new Puzzle();
const rows = (process.argv[3] === 'B') ? 400000 : 40;

const nextRow = prevRow => {
  let row = '';
  for (let tile = 0; tile < prevRow.length; tile++) {
    const leftTile = (tile > 0) ? prevRow[tile - 1] : '.';
    const centerTile = prevRow[tile];
    const rightTile = (tile < (prevRow.length - 1)) ? prevRow[tile + 1] : '.';
    row += (
      (leftTile === '^' && centerTile === '^' && rightTile === '.') ||
      (leftTile === '.' && centerTile === '^' && rightTile === '^') ||
      (leftTile === '^' && centerTile === '.' && rightTile === '.') ||
      (leftTile === '.' && centerTile === '.' && rightTile === '^')
    ) ? '^' : '.';
  }
  return row;
};

p.before = lines => {
  const room = lines.slice(0);
  for (let i = 1; i < rows; i++) {
    room.push(nextRow(room[i - 1]));
  }
  return room;
};

p.after = room => {
  let safeTiles = 0;
  for (let row of room) {
    safeTiles += (row.match(/\./g)||[]).length;
  }
  return safeTiles;
};

p.run();
