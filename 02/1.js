const fs = require('fs');

const input = fs
  .readFileSync('input')
  .toString()
  .trim()
  .split('\n')
  .map(value => value.trim())
  .map(value => value.split(''));

let coordinates = [1,1];
let code = '';

input.forEach(button => {
  button.forEach(instruction => {
    if (instruction === 'D' && coordinates[1] < 2) {
      coordinates[1]++;
    }
    if (instruction === 'L' && coordinates[0] > 0) {
      coordinates[0]--;
    }
    if (instruction === 'R' && coordinates[0] < 2) {
      coordinates[0]++;
    }
    if (instruction === 'U' && coordinates[1] > 0) {
      coordinates[1]--;
    }
  });

  code += coordinates[1] * 3 + coordinates[0] + 1;
});

console.log(code);
