const Puzzle = require('@thefotios/advent_puzzle');

const p = new Puzzle();
const instructionPattern = /^Disc #(\d) has (\d+) positions; at time=(\d+), it is at position (\d+)\.$/;

const getDisc = (discs, offset) => {
  return discs.filter(d => d.disc === offset).pop();
};

const testDisc = (disc, time) => {
  return (disc.position + time) % disc.positions === 0;
};

p.before = lines => lines.map(line => line.join(' ')).map(line => {
  const matches = instructionPattern.exec(line);
  return {
    disc: +matches[1],
    positions: +matches[2],
    time: +matches[3],
    position: +matches[4]
  };
});

p.B = discs => [...discs, {
  disc: 7,
  positions: 11,
  time: 0,
  position: 0
}];

p.after = discs => {
  let time = 0;
  while (true) {
    let passed = true;
    for (let offset = 1; offset <= discs.length; offset++) {
      const disc = getDisc(discs, offset);
      if (!testDisc(disc, time + offset)) {
        passed = false;
        break;
      }
    }

    if (passed) {
      break;
    }

    time++;
  }
  return time;
};

p.run();
