const Puzzle = require('@thefotios/advent_puzzle');

const p = new Puzzle();

p.before = lines => lines.shift();

p.A = line => {
  for (let pos = 0; pos < line.length; pos++) {
    const match = /^\((\d+)x(\d+)\)/.exec(line.slice(pos));
    if (match) {
      const repeatSection = line.substr(pos + match[0].length, match[1]).repeat(match[2]);
      const offset = pos + match[0].length + parseInt(match[1]);
      line = line.slice(0, pos) + repeatSection + line.slice(offset);
      pos = pos + repeatSection.length - 1;
    }
  }
  return line.length;
};

p.B = line => {
  const decompress = (string, cb) => {
    let sum = 0;
    let pos = 0;

    while (string.length > 0) {
      if (string[0] !== '(') {
        sum++;
        string = string.slice(1);
        continue;
      }

      const match = /^\((\d+)x(\d+)\)(.*)$/.exec(string);
      const substringLength = cb(match[3].substr(0, +match[1]), cb);
      sum += substringLength * (+match[2]);
      string = match[3].substr(+match[1]);
    }

    return sum;
  };

  return decompress(line, decompress);
};

p.run();
