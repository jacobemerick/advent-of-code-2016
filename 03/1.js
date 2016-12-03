const fs = require('fs');

const input = fs
  .readFileSync('input')
  .toString()
  .split('\n')
  .map(value => value.trim())
  .map(value => value.split(/\s+/))
  .map(array => array.map(value => parseInt(value)))
  .map(array => array.sort((a, b) => a - b));

let validTriangles = 0;

input.forEach(lengths => {
  if ((lengths[0] + lengths[1]) > lengths[2]) {
    validTriangles++;
  }
})

console.log(validTriangles);
