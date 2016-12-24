const Puzzle = require('@thefotios/advent_puzzle');
const getPermutations = require('get-permutations');

const p = new Puzzle();

p.before = lines => lines.map(line => line.pop().split(''));

p.after = lines => {
  const numberLocs = new Array(7);
  lines.forEach((line, y) => {
    line.forEach((loc, x) => {
      if (!isNaN(loc)) {
        numberLocs[+loc] = [x, y];
      }
    });
  });

  const maxX = lines[0].length;
  const maxY = lines.length;

  const solveSet = (start, end) => {
    let paths = [[start]];
    let step = -1;
    let successfulPaths = [];

    while (true) {
      step++;
      for (path of paths) {
        if (!path[step]) {
          continue;
        }
        const position = path[step];
        if (position[0] === end[0] && position[1] === end[1]) {
          return step;
        }

        const testMoves = [
          [position[0] - 1, position[1]],
          [position[0] + 1, position[1]],
          [position[0], position[1] - 1],
          [position[0], position[1] + 1]
        ].filter(position => {
          if (position[0] < 0 || position[1] < 0) {
            return false;
          }

          if (position[0] > maxX || position[1] > maxY) {
            return false;
          }

          if (lines[position[1]][position[0]] === '#') {
            return false;
          }

          return !paths.some(path => path.some(loc => loc[0] === position[0] && loc[1] === position[1]));
        });

        if (testMoves.length === 0) {
          continue;
        }

        if (testMoves.length > 1) {
          for (var i = 1; i < testMoves.length; i++) {
            let branch = path.slice(0);
            branch.push(testMoves[i]);
            paths.push(branch);
          }
        }
        path.push(testMoves[0]);
      }
    }
  };

  const resolvedSets = new Map();
  numberLocs.forEach((pos, loc) => {
    numberLocs.forEach((subPos, subLoc) => {
      if (loc !== subLoc) {
        if (resolvedSets.has('' + subLoc + loc)) {
          resolvedSets.set('' + loc + subLoc, resolvedSets.get('' + subLoc + loc));
        } else {
          resolvedSets.set('' + loc + subLoc, solveSet(pos, subPos));
        }
      }
    });
  });

  const permutations = getPermutations('1234567'.split(''));
  let shortestPath = 1000000000000;

  for (let option of permutations) {
    let optionLength = resolvedSets.get('0' + option[0]);
    for (let i = 0; i < (option.length - 1); i++) {
      optionLength += resolvedSets.get(option[i] + option[i + 1]);
    }

    if (process.argv[3] === 'B') {
      optionLength += resolvedSets.get(option[option.length - 1] + '0');
    }
    
    if (optionLength < shortestPath) {
      shortestPath = optionLength;
    }
  }

  return shortestPath;
};

p.run();
