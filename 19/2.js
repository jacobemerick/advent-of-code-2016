const elfCount = 3018458;

const exp = Math.floor(Math.log(elfCount) / Math.log(3));
const elfPower = Math.pow(3, exp);

let lastElf = 2 * elfCount - 3 * elfPower;
if (elfCount === elfPower) {
  lastElf = elfCount;
}
if (elfCount - elfPower <= elfPower) {
  lastElf = elfCount - elfPower;
}

console.log(lastElf);
