const Puzzle = require('@thefotios/advent_puzzle');

const p = new Puzzle();
const registers = {
  'a': 0,
  'b': 0,
  'c': 0,
  'd': 0
};

if (process.argv[3] === 'B') {
  registers['c'] = 1;
}

p.after = lines => {
  for (let i = 0; i < lines.length; i++) {
    if (lines[i][0] === 'cpy') {
      if (+lines[i][1]) {
        registers[lines[i][2]] = +lines[i][1];
      } else {
        registers[lines[i][2]] = registers[lines[i][1]];
      }
      continue;
    }
    if (lines[i][0] === 'inc') {
      registers[lines[i][1]]++;
      continue;
    }
    if (lines[i][0] === 'dec') {
      registers[lines[i][1]]--;
      continue;
    }
    if (lines[i][0] === 'jnz') {
      if (!+lines[i][1] && registers[lines[i][1]] === 0) {
        continue;
      }
      i += +lines[i][2] - 1;
    }
  }

  return registers['a'];
};

p.run();
