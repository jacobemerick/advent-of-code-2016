const start = { x: 1, y: 1 };
const goal = { x: 31, y: 39 };
const input = 1352;

const isOpen = (x, y) => {
  const sum = (x * x) + (3 * x) + (2 * x * y) + y + (y * y) + input;
  const binarySum = (sum >>> 0).toString(2);
  const oneCount = (binarySum.match(/1/g)||[]).length;
  return ((oneCount % 2) === 0);
};

const leftPad = digit => {
  return '00'.substring(0, (2 - ('' + digit).length)) + digit;
};

const maxX = +process.argv[2];
const maxY = +process.argv[3];

const layout = [];
for (let y = 0; y <= maxY; y++) {
  layout.push([]);
  for (let x = 0; x <= maxX; x++) {
    layout[y].push(isOpen(x, y) ? '.' : '#');
  }
}

const xAxis = Array.from({length: +maxX + 1}, (v, k) => leftPad(k));
xAxis.unshift(' ');
console.log(xAxis.join(' ')); 

for (let y = 0; y <= maxY; y++) {
  console.log(leftPad(y) + ' ' + layout[y].join('  '));
}

const paths = [[start]];
let shortestPath = (+maxX * +maxY);
while (true) {
  const path = paths.slice(-1).pop();
  const position = path.slice(-1).pop();
  let testMoves = [];
  if (position.x > 0) {
    testMoves.push({ x: position.x - 1, y: position.y });
  }
  if (position.y > 0) {
    testMoves.push({ x: position.x, y: position.y - 1 });
  }
  if (position.x < maxX) {
    testMoves.push({ x: position.x + 1, y: position.y });
  }
  if (position.y < maxY) {
    testMoves.push({ x: position.x, y: position.y + 1 });
  }

  testMoves = testMoves.filter(move => isOpen(move.x, move.y));
  testMoves = testMoves.filter(move => {
    return path.filter(pastPosition => JSON.stringify(pastPosition) === JSON.stringify(move)).length === 0;
  });
  if (testMoves.length < 1) {
    paths.splice(-1);
    continue;
  }

  const finalMove = testMoves.filter(move => (move.x === goal.x && move.y === goal.y));
  if (finalMove.length > 0) {
    if (shortestPath > path.length) {
      shortestPath = path.length;
      console.log('found a solution:' + path.length + ', still have ' + paths.length + ' to test');
    }
    paths.splice(-1);
    continue;
  }

  for (let i = 1; i < testMoves.length; i++) {
    const branch = path.slice(0);
    branch.push(testMoves[i]);
    paths.push(branch);
  }
  path.push(testMoves[0]);
}
