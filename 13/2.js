const start = { x: 1, y: 1 };
const maxSteps = 50;
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

let step = 0;
let paths = [[start]];
const distinctDestinations = [start];
while (true) {
  for (path of paths) {
    if (path.length > maxSteps) {
      console.log(distinctDestinations.length);
      process.exit();
    }
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
      const duplicateDestination = distinctDestinations.filter(destination => {
        return move.x === destination.x && move.y === destination.y;
      });
      return duplicateDestination.length < 1;
    });

    if (testMoves.length < 1) {
      continue;
    }

    let isFirst = true;
    for (testMove of testMoves) {
      distinctDestinations.push(testMove);
      const branch = path.slice(0);
      branch.push(testMove);
      paths.push(branch);
    }

  }
}
