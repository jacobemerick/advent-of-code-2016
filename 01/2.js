const fs = require('fs');

const input = fs
  .readFileSync('input')
  .toString()
  .split(',')
  .map(value => value.trim());

let direction = 0;
let path = [[0,0]];
let crossPath = false;

input.every(instruction => {
  const turn = instruction.substring(0, 1);
  const steps = parseInt(instruction.substring(1));

  if (turn === 'L') {
    direction -= 90;
  }
  if (turn === 'R') {
    direction += 90;
  }
  if (direction === -90) {
    direction = 270;
  }
  if (direction === 360) {
    direction = 0;
  }

  for (let i = 0; (i < steps) || crossPath; i++) {
    let nextLeg = path.slice(-1).pop().slice();

    if (direction === 0) {
      nextLeg[1]++;
    }
    if (direction === 90) {
      nextLeg[0]++;
    }
    if (direction === 180) {
      nextLeg[1]--;
    }
    if (direction === 270) {
      nextLeg[0]--;
    }

    if (path.find(pathLeg => pathLeg[0] === nextLeg[0] && pathLeg[1] === nextLeg[1])) {
      console.log(Math.abs(nextLeg[0]) + Math.abs(nextLeg[1]));
      crossPath = true;
      break;
    }

    path[path.length] = nextLeg.slice();
  }

  return !crossPath;
});
