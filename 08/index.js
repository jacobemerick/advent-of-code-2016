const Puzzle = require('@thefotios/advent_puzzle');
const lodash = require('lodash');

const p = new Puzzle();

p.before = lines => {
  lines = lines.map(line => {
    if (line[0] === 'rect') {
      return ['rect', ...line[1].split('x')];
    }

    if (line[0] === 'rotate') {
      return ['rotate', ...line[2].split('='), line[4]];
    }
  });

  let display = Array.from({length: 6}, () => Array.from({length: 50}, () => '.'));
  lines.forEach(line => {
    if (line[0] === 'rect') {
      for (let col = 0; col < line[2]; col++) {
        for (let row = 0; row < line[1]; row++) {
          display[col][row] = '#';
        }
      }
    }

    if (line[0] === 'rotate') {
      if (line[1] === 'y') {
        display[line[2]] = [...display[line[2]].slice(-line[3]), ...display[line[2]].slice(0, -line[3])];
      }
      if (line[1] === 'x') {
        let newDisplay = lodash.cloneDeep(display);
        for (let row = 0; row < display.length; row++) {
          newDisplay[(row + parseInt(line[3])) % 6][line[2]] = display[row][line[2]];
        }
        display = lodash.assign(newDisplay);
      }
    }
  });
  return display;
};

p.A = display => {
  let count = 0;
  for (let row = 0; row < display.length; row++) {
    for (let col = 0; col < display[0].length; col++) {
      if (display[row][col] === '#') {
        count++;
      }
    }
  }

  return count;
};

p.B = display => {
  let text = '';
  for (let row = 0; row < display.length; row++) {
    for (let col = 0; col < display[0].length; col++) {
      text += display[row][col];
    }
    text += '\n';
  }

  return text;
};

p.run();
