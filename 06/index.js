const Puzzle = require('@thefotios/advent_puzzle');

const p = new Puzzle();
const alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m',
                  'n','o','p','q','r','s','t','u','v','w','x','y','z'];
let message = [];

p.before = lines => {
  lines = lines.map(line => line.shift());

  message = Array.apply(null, Array(lines[0].length)).map(() => {
    const letterMap = new Map();
    alphabet.forEach(letter => letterMap.set(letter, 0));
    return letterMap;
  });

  lines.forEach(corruptMessage => {
    return corruptMessage.split('').forEach((letter, index) => {
      message[index].set(letter, message[index].get(letter) + 1);
      return message;
    });
  });

  return message;
};

p.A = message => {
  let finalMessage = '';
  message.forEach((letterMap, index) => {
    let commonCount = 0;
    let commonLetter = 0;
    letterMap.forEach((count, letter) => {
      if (count > commonCount) {
        commonCount = count;
        commonLetter = letter;
      }
    });
    finalMessage += commonLetter;
  });
  return finalMessage;
};

p.B = message => {
  let finalMessage = '';
  message.forEach((letterMap, index) => {
    let commonCount = 100;
    let commonLetter = 0;
    letterMap.forEach((count, letter) => {
      if (count < commonCount) {
        commonCount = count;
        commonLetter = letter;
      }
    });
    finalMessage += commonLetter;
  });
  return finalMessage;
};

p.run();
