const elfCount = 3018458;

const firstFactor = elfCount.toString(2).slice(0, 1);
const remainder = elfCount.toString(2).slice(1);
const lastElf = parseInt(remainder + firstFactor, 2);

console.log(lastElf);
