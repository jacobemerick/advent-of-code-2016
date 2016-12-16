const input = '11011110011011101';
const diskLength = (process.argv[2] == 'B') ? 35651584 : 272;

const generateData = a => {
  let b = a.split('').reverse().map(datum => +datum ? 0 : 1).join('');
  return `${a}0${b}`;
};

const generateChecksum = data => {
  let checksum = '';
  const pairs = data.match(/../g);
  for (let pair of pairs) {
    checksum += (pair[0] == pair[1]) ? '1' : '0';
  }
  return checksum;
};

let data = input;
while (data.length < diskLength) {
  data = generateData(data);
}
data = data.substr(0, diskLength);

let checksum = generateChecksum(data);
while (checksum.length % 2 === 0) {
  checksum = generateChecksum(checksum);
}

console.log(checksum);
