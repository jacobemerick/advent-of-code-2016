const Puzzle = require('@thefotios/advent_puzzle');
const getPermutations = require('get-permutations');

const p = new Puzzle();

const swapPosition = (password, x, y) => {
  let scrambled = password;
  scrambled = password.substring(0, x) + password.substr(y, 1) + password.substr(x + 1);
  scrambled = scrambled.substring(0, y) + password[x] + scrambled.substring(y + 1);
  return scrambled;
};

const swapLetter = (password, a, b) => {
  return password.replace(a, '#').replace(b, a).replace('#', b);
};

const rotateSteps = (password, direction, steps) => {
  if (steps > password.length) {
    steps = steps % password.length;
  }
  if (direction === 1) {
    return password.substring(password.length - steps) + password.substring(0, password.length - steps);
  }
  return password.substring(steps) + password.substring(0, steps);
};

const rotateByPosition = (password, a, direction) => {
  let steps = password.indexOf(a);
  if (steps >= 4) {
    steps++;
  }
  steps++;
  return rotateSteps(password, direction, steps);
};

const reverseSpan = (password, x, y) => {
  return password.substring(0, x)
       + password.substring(x, y + 1).split('').reverse().join('')
       + password.substring(y + 1);
};

const movePosition = (password, x, y) => {
  if (x < y) {
    return password.substring(0, x)
         + password.substring(x + 1, y + 1)
         + password.substring(x, x + 1)
         + password.substring(y + 1);
  }
  if (x > y) {
    return password.substring(0, y)
         + password.substring(x, x + 1)
         + password.substring(y, x)
         + password.substring(x + 1);
  }
  return password;
}

const performStep = (scrambledPassword, instruction) => {
  let matches;

  matches = instruction.match(/swap position (\d+) with position (\d+)/);
  if (matches) {
    return swapPosition(scrambledPassword, +matches[1], +matches[2]);
  }

  matches = instruction.match(/swap letter (\w) with letter (\w)/);
  if (matches) {
    return swapLetter(scrambledPassword, matches[1], matches[2]);
  }

  matches = instruction.match(/rotate (\w+) (\d+) steps?/);
  if (matches) {
    return rotateSteps(scrambledPassword, matches[1] === 'left' ? -1 : 1, +matches[2]);
  }

  matches = instruction.match(/rotate based on position of letter (\w)/);
  if (matches) {
    return rotateByPosition(scrambledPassword, matches[1], 1);
  }

  matches = instruction.match(/reverse positions (\d+) through (\d+)/);
  if (matches) {
    return reverseSpan(scrambledPassword, +matches[1], +matches[2]);
  }

  matches = instruction.match(/move position (\d+) to position (\d+)/);
  if (matches) {
    return movePosition(scrambledPassword, +matches[1], +matches[2]);
  }
};

p.before = lines => lines.map(line => line.join(' '));

p.A = instructions => {
  let scrambledPassword = 'abcdefgh';
  instructions.forEach(instruction => {
    scrambledPassword = performStep(scrambledPassword, instruction);
  });
  return scrambledPassword;
};

p.B = instructions => {
  const passwords = getPermutations('abcdefgh'.split(''));
  for (password of passwords) {
    let scrambledPassword = password.join('');
    instructions.forEach(instruction => {
      scrambledPassword = performStep(scrambledPassword, instruction);
    });
    if (scrambledPassword == 'fbgdceah') {
      break;
    }
  };
  return password.join('');
};

p.run();
