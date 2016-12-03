const fs = require('fs');

const input = fs
  .readFileSync('input')
  .toString()
  .split('\n')
  .map(value => value.trim())
  .map(value => value.split(/\s+/))
  .map(array => array.map(value => parseInt(value)));

let validTriangles = 0;

for (let i = 0; i < (input.length - 3); i += 3) {
  for (let j = 0; j < 3; j++) {
    let lengths = [
      input[i][j],
      input[i + 1][j],
      input[i + 2][j]
    ];
    lengths.sort((a,b) => a - b);
    if ((lengths[0] + lengths[1]) > lengths[2]) {
      validTriangles++;
    }
  }
}

console.log(validTriangles);
