const Puzzle = require('@thefotios/advent_puzzle');

const p = new Puzzle();

p.before = lines => lines
  .map(line => line.pop().split('-'))
  .map(range => range.map(boundary => +boundary))
  .sort((a, b) => (a[0] < b[0]) ? -1 : 1)
  .reduce((a, b) => {
    if (a.length < 1) {
      return [b];
    }
    if (b[0] <= (a[a.length - 1][1] + 1)) {
      if (b[1] > a[a.length - 1][1]) {
        a[a.length - 1][1] = b[1];
      }
    } else {
      a.push(b);
    }
    return a;
  }, []);

p.A = ranges => ranges.shift()[1] + 1;

p.B = ranges => {
  let allowedIps = 0;
  for (let key in ranges) {
    if (key < 1) {
      continue;
    }
    allowedIps += ranges[key][0] - ranges[key - 1][1] - 1;
  }
  return allowedIps;
};

p.run();
