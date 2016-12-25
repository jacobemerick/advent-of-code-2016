const Puzzle = require('@thefotios/advent_puzzle');

const p = new Puzzle();

p.after = lines => {
  let start = 0;
  while (true) {
    let output = '';
    const registers = {
      'a': start,
      'b': 0,
      'c': 0,
      'd': 0
    };

    for (let i = 0; i < lines.length; i++) {
      if (lines[i][0] === 'cpy') {
        if (!isNaN(lines[i][1])) {
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
        const jump = (isNaN(lines[i][2])) ? registers[lines[i][2]] : +lines[i][2];
        const compare = (isNaN(lines[i][1])) ? registers[lines[i][1]] : +lines[i][1];

        if (compare === 0) {
          continue;
        }
        if ((i + jump) < 0) {
          continue;
        }
        i += jump - 1;
        continue;
      }
      if (lines[i][0] === 'tgl') {
        const j = i + registers[lines[i][1]];
        if (!lines[j]) {
          continue;
        }
        if (lines[j][2]) {
          if (lines[j][0] === 'jnz') {
            lines[j][0] = 'cpy';
          } else {
            lines[j][0] = 'jnz';
          }
        } else {
          if (lines[j][0] === 'inc') {
            lines[j][0] = 'dec';
          } else {
            lines[j][0] = 'inc';
          }
        }
      }
      if (lines[i][0] === 'out') {
        output += registers[lines[i][1]];
        if (output.length >= 100) {
          break;
        }
      }
    }

    if (/^(01|10)\1+$/.test(output)) {
      break;
    }
    start++;
  }
  return start;
};

p.run();
