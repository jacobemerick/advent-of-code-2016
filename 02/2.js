const fs = require('fs');

const input = fs
  .readFileSync('input')
  .toString()
  .trim()
  .split('\n')
  .map(value => value.trim())
  .map(value => value.split(''));

let coordinates = [0,2];
let code = '';

input.forEach(button => {
  button.forEach(instruction => {
    if (instruction === 'D' &&
       ((coordinates[0] > 0 && coordinates[0] < 4 && coordinates[1] < 3) ||
        (coordinates[0] === 2 && coordinates[1] < 4))) {
      coordinates[1]++;
    }
    if (instruction === 'L' && 
       ((coordinates[1] > 0 && coordinates[1] < 4 && coordinates[0] > 1) ||
        (coordinates[1] === 2 && coordinates[0] > 0))) {
      coordinates[0]--;
    }
    if (instruction === 'R' &&
       ((coordinates[1] > 0 && coordinates[1] < 4 && coordinates[0] < 3) ||
        (coordinates[1] === 2 && coordinates[0] < 4))) {
      coordinates[0]++;
    }
    if (instruction === 'U' &&
       ((coordinates[0] > 0 && coordinates[0] < 4 && coordinates[1] > 1) ||
        (coordinates[0] === 2 && coordinates[1] > 0))) {
      coordinates[1]--;
    }
  });

  let digit = '';
  if (coordinates[1] === 0) {
    digit = 1;
  } else if (coordinates[1] === 1) {
    digit = coordinates[0] + 1;
  } else if (coordinates[1] === 2) {
    digit = coordinates[0] + 5;
  } else if (coordinates[1] === 3) {
    digit = ['A', 'B', 'C'][coordinates[0] - 1];
  } else if (coordinates[1] === 4) {
    digit = 'D';
  }
  code += digit;
});

console.log(code);
