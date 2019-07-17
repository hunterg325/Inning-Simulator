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
      this.bases[base] > 0 ? runners += 1 : null;
    });

    return runners;
  }

  isLoaded() {
    return this.getRunners() === 3;
  }

  empty() {
    this.bases = {
      first: 0,
      second: 0,
      third: 0
    }
  }

  advanceRunners(baseCount, runs, isWalkOrHbp) {
    let hasHitterAdvanced = false;

    for (let i = 0; i < baseCount; i += 1) {
      // Check if runner is on third
      if (this.isRunnerOnBase('third')) {
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

      if (!hasHitterAdvanced) {
        this.bases.first = 1;
      }

      hasHitterAdvanced = true;

    }

    return runs;
  }

  advanceRunner(base) {
    return this.bases[base] = 1;
  }

  emptyBase(base) {
    this.bases[base] = 0;
  }

  isRunnerOnBase(base) {
    return this.bases[base] === 1;
  }

}

module.exports = Bases;
