const crypto = require('crypto');

const salt = 'zpqevtbw';
const repeat = (process.argv[2] === 'A') ? 0 : 2016;

const getHash = index => {
  if (hashes[index]) {
    return hashes[index];
  }

  let hash = crypto.createHash('md5').update(salt + index).digest('hex');
  for (let i = 0; i < repeat; i++) {
    hash = crypto.createHash('md5').update(hash).digest('hex');
  }
  hashes[index] = hash;
  return hash;
};

let index = -1;
let hashes = [];
let foundKeys = 0;
while (foundKeys < 64) {
  index++;
  const hash = getHash(index);
  const triple = /(.)\1\1/.exec(hash);
  if (triple) {
    for (let j = 1; j < 1001; j++) {
      const lookaheadHash = getHash(index + j);
      const quintet = /(.)\1\1\1\1/.exec(lookaheadHash);
      if (quintet && triple[1] === quintet[1]) {
        foundKeys++;
      }
    }
  }
}

console.log(index);
