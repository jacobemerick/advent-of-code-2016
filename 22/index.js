const Puzzle = require('@thefotios/advent_puzzle');

const p = new Puzzle();

p.before = lines => lines
  .filter(line => line[0].substr(0, 4) === '/dev')
  .map(line => ({
    position: line[0].match(/-x(\d+)-y(\d+)$/).slice(1, 3),
    used: +(line[2].substr(0, line[2].length - 1)),
    available: +(line[3].substring(0, line[3].length - 1))
  }));

p.A = servers => servers.reduce((count, server) => {
  if (server.used === 0) {
    return count;
  }

  return count + servers.reduce((subCount, subServer) => {
    if (server.position === subServer.position) {
      return subCount;
    }

    if (server.used < subServer.available) {
      return subCount + 1;
    }

    return subCount;
  }, 0);
}, 0);

p.run();
