class Bases {
  constructor() {
    this.bases = {
      first: 0,
      second: 0,
      third: 0
    }
  }

  getRunners() {
    let runners = 0;

    Object.keys(this.bases).forEach(base => {
      if (this.bases[base] > 0) {
        runners += 1;
      }
    });

    return runners;
  }

  isLoaded() {
    return this.getRunners() === 3;
  }

  advanceRunners(baseCount, runs, isWalkOrHbp, isOut) {
    let hasHitterAdvanced = false;

    for (let i = 0; i < baseCount; i += 1) {
      // Check if runner is on third
      if (this.isRunnerOnBase('third')) {

        // Check if play type is not walk or HBP or is
        if (!isWalkOrHbp || isWalkOrHbp && this.isLoaded()) {
          // Advance runner home
          runs += 1;
          this.bases.third = 0;
        }
      }

      if (this.isRunnerOnBase('second')) {
        // Advance runner to third
        this.bases.third = 1;
        this.bases.second = 0;
      }

      if (this.isRunnerOnBase('first')) {
        // Advance runner to second
        this.bases.second = 1;
        this.bases.first = 0;

      }

      if (!hasHitterAdvanced && !isOut) {
        this.bases.first = 1;
      }

      hasHitterAdvanced = true;

    }

    return runs;
  }

  isRunnerOnBase(base) {
    return this.bases[base] === 1;
  }

  formatResults() {
    let results = '';

    Object.keys(this.bases).forEach(base  => {
      results += this.bases[base];
    });

    return results;
  }
}

module.exports = Bases;
