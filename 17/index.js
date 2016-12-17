const crypto = require('crypto');

const input = 'qzthpkfp';

const openPaths = path => {
  const hash = crypto.createHash('md5').update(input + path.join('')).digest('hex').substring(0, 4);
  const directions = ['U', 'D', 'L', 'R'];
  const openPaths = [];
  for (let index in hash) {
    if (hash[index].match(/[bcdef]/)) {
      openPaths.push(directions[index]);
    }
  }
  return openPaths;
};

const getPosition = path => {
  const position = [0, 0];
  for (let direction of path) {
    if (direction === 'U') {
      position[1]--;
    }
    if (direction === 'D') {
      position[1]++;
    }
    if (direction === 'L') {
      position[0]--;
    }
    if (direction === 'R') {
      position[0]++;
    }
  }
  return position;
};

const paths = [[]];
const validPaths = [];

for (let path of paths) {
  const openDirections = openPaths(path);
  for (let direction of openDirections) {
    const choice = path.slice(0);
    choice.push(direction);
    const position = getPosition(choice);
    if (position[0] < 0 || position[1] < 0) {
      continue;
    }
    if (position[0] > 3 || position[1] > 3) {
      continue;
    }
    if (position[0] === 3 && position[1] === 3) {
      validPaths.push(choice.join(''));
      continue;
    }
    paths.push(choice);
  }
}

console.log(process.argv[2] === 'B' ? validPaths[validPaths.length - 1].length : validPaths[0]);
