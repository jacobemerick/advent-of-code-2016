const Puzzle = require('@thefotios/advent_puzzle');

const p = new Puzzle();
const alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m',
                  'n','o','p','q','r','s','t','u','v','w','x','y','z'];

p.before = lines => lines.map(data => {
  const [line, checksum] = data.shift().slice(0, -1).split('[');
  return {
    name: line.substring(0, line.lastIndexOf('-')),
    sectorId: parseInt(line.substring(line.lastIndexOf('-') + 1)),
    checksum: checksum
  }
}).filter(data => {
  const charCount = {};
  data.name.split('').forEach(character => {
    if (character === '-') {
      return;
    }
    if (!charCount.hasOwnProperty(character)) {
      charCount[character] = 1;
      return;
    }
    charCount[character]++;
  });

  const characters = Object.getOwnPropertyNames(charCount).sort((a, b) => {
    if (charCount[b] === charCount[a]) {
      return (b > a) ? -1 : 1;
    }
    return charCount[b] - charCount[a];
  });

  let isValid = true;
  data.checksum.split('').forEach((character, position) => {
    if (position !== characters.indexOf(character)) {
      isValid = false;
    }
  });
  return isValid;
});

p.A = lines => lines.reduce((a, b) => a + b.sectorId, 0);

p.B = lines => lines.map(data => {
  const modShift = data.sectorId % 26;

  data.decryptedName = '';

  data.name.split('').forEach(character => {
    if (character === '-') {
      data.decryptedName += ' ';
      return;
    }

    let newCharPos = alphabet.indexOf(character) + modShift;
    if (newCharPos > 25) {
      newCharPos -= 26;
    }
    data.decryptedName += alphabet[newCharPos];
  });
  return data;
}).filter(data => data.decryptedName.match(/pole/));

p.run();
