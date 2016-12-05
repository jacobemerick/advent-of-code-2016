const crypto = require('crypto');

const input = 'cxdnnyjw';
let index = 0;
let password = '';

while (password.length < 8) {
  const hash = crypto.createHash('md5').update(input + index).digest('hex');
  if (hash.substring(0, 5) === '00000') {
    password += hash.substring(5, 6);
  }
  index++;
}
console.log('1: ' + password);

index = 0;
password = Array.apply(null, Array(8)).map(() => '_');

while (password.indexOf('_') > -1) {
  const hash = crypto.createHash('md5').update(input + index).digest('hex');
  if (hash.substring(0, 5) === '00000' && hash[5] < 8 && password[hash[5]] === '_') {
    password[hash[5]] = hash[6];
  }
  index++;
}
console.log('2: ' + password.join(''));
