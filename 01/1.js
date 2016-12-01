const fs = require('fs');

const input = fs
  .readFileSync('input')
  .toString()
  .split(',')
  .map(value => value.trim());

let direction = 0;
let coordinates = [0,0];

input.forEach(instruction => {
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

  if (direction === 0) {
    coordinates[1] += steps;
  }
  if (direction === 90) {
    coordinates[0] += steps;
  }
  if (direction === 180) {
    coordinates[1] -= steps;
  }
  if (direction === 270) {
    coordinates[0] -= steps;
  }
});

console.log(Math.abs(coordinates[0]) + Math.abs(coordinates[1]));
