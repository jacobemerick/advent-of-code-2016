const Puzzle = require('@thefotios/advent_puzzle');

const p = new Puzzle();

function isAbba(seq) {
  if (seq.indexOf('[') > -1 || seq.indexOf(']') > -1) {
    return false;
  }
  if (seq[0] === seq[1]) {
    return false;
  }
  if (seq[0] !== seq[3]) {
    return false;
  }
  if (seq[1] !== seq[2]) {
    return false;
  }
  return true;
}

function isAba(seq) {
  if (seq.indexOf('[') > -1 || seq.indexOf(']') > -1) {
    return false;
  }
  if (seq[0] === seq[1]) {
    return false;
  }
  if (seq[0] !== seq[2]) {
    return false;
  }
  return true;
}

p.before = lines => lines.map(line => line.shift());

p.A = lines => {
  let tlsCount = 0;
  lines.forEach(line => {
    let isTls = false;
    let inBrackets = false;
    for (let i = 0; i < (line.length - 3); i++) {
      if (line[i] === '[') {
        inBrackets = true;
        continue;
      }
      if (line[i] === ']') {
        inBrackets = false;
        continue
      }
      if (isAbba(line.substr(i, 4)) && !inBrackets) {
        isTls = true;
        continue;
      }
      if (isAbba(line.substr(i, 4)) && inBrackets) {
        isTls = false;
        break;
      }
    }
    if (isTls) {
      tlsCount++;
    }
  });
  return tlsCount;
};

p.B = lines => {
  let sslCount = 0;
  lines.forEach(line => {
    let isSsl = false;
    let inBrackets = false;
    let abas = [];
    let babs = [];
    for (let i = 0; i < (line.length - 2); i++) {
      if (line[i] === '[') {
        inBrackets = true;
        continue;
      }
      if (line[i] === ']') {
        inBrackets = false;
        continue
      }
      if (isAba(line.substr(i, 3))) {
        const flippedAba = line[i + 1] + line[i] + line[i + 1];
        if (inBrackets) {
          if (abas.indexOf(flippedAba) > -1) {
            isSsl = true;
            break;
          }
          babs.push(line.substr(i, 3));
        }
        if (!inBrackets) {
          if (babs.indexOf(flippedAba) > -1) {
            isSsl = true;
            break;
          }
          abas.push(line.substr(i, 3));
        }
      }
    }
    if (isSsl) {
      sslCount++;
    }
  });
  return sslCount;
};

p.run();
