const Puzzle = require('@thefotios/advent_puzzle');

const p = new Puzzle();
const bots = new Map();
const outputs = new Map();
const assignMatch = /^value (\d+) goes to bot (\d+)$/;
const commandMatch = /^bot (\d+) gives low to (\w+) (\d+) and high to (\w+) (\d+)$/;

const assign = (bot, chip) => {
  if (bots.has(bot)) {
    const carrying = bots.get(bot);
    carrying.push(chip);
    bots.set(bot, carrying);
  } else {
    bots.set(bot, [chip]);
  }
}

const dump = (output, chip) => {
  if (outputs.has(output)) {
    const bin = outputs.get(output);
    bin.push(chip);
    outputs.set(output, bin);
  } else {
    outputs.set(output, [chip]);
  }
}

p.before = lines => lines.map(line => line.join(' ')).filter(line => {
  const assignments = assignMatch.exec(line);
  if (assignments) {
    assign(assignments[2], assignments[1]);
    return false;
  }
  return true;
});


p.A = lines => {
  while (true) {
    for (line of lines) {
      const commands = commandMatch.exec(line);
      if (!commands) {
        continue;
      }
      if (!bots.has(commands[1])) {
        continue;
      }
      if (bots.has(commands[1]) && bots.get(commands[1]).length < 2) {
        continue;
      }

      const chips = bots.get(commands[1]);
      chips.sort((a,b) => +a > +b);

      if (chips.indexOf('61') > -1 && chips.indexOf('17') > -1) {
        return commands[1];
      }

      if (commands[2] === 'bot') {
        assign(commands[3], chips[0]);
      }
      if (commands[4] === 'bot') {
        assign(commands[5], chips[1]);
      }
      bots.set(commands[1], []);
    }
  };
};

p.B = lines => {
  let loopDaLoop = true;
  while (loopDaLoop) {
    loopDaLoop = false;
    for (line of lines) {
      const commands = commandMatch.exec(line);
      if (!commands) {
        continue;
      }
      if (!bots.has(commands[1])) {
        continue;
      }
      if (bots.has(commands[1]) && bots.get(commands[1]).length < 2) {
        continue;
      }
      loopDaLoop = true;

      const chips = bots.get(commands[1]);
      chips.sort((a,b) => +a > +b);

      if (commands[2] === 'bot') {
        assign(commands[3], chips[0]);
      }
      if (commands[2] === 'output') {
        dump(commands[3], chips[0]);
      }
      if (commands[4] === 'bot') {
        assign(commands[5], chips[1]);
      }
      if (commands[4] === 'output') {
        dump(commands[5], chips[1]);
      }

      bots.set(commands[1], []);
    }
  };

  return outputs.get('0') * outputs.get('1') * outputs.get('2');
};

p.run();
