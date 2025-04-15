module.exports = {
  startTimer: () => Date.now(),
  endTimer: (start) => Date.now() - start
};
