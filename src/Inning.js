const PlayTypes = require('./PlayTypes');
const Bases = require('./Bases');

class Inning {
  constructor(plays) {
    this.plays = plays;
    this.outs = 0;
    this.runs = 0;
  }

  play() {
    const playTypes = new PlayTypes(this.plays);
    const types = playTypes.parseTypes();
    const bases = new Bases();
    let isInningOver = false;

    types.forEach(type => {
      if (isInningOver) {
        return;
      }

      // Ensure play type is valid. If not, return here
      if (!playTypes.isValid(type)) {
        console.log(`Play type ${type} is an invalid play type`);
        return;
      }

      // Check if type is an out or a k
      if (playTypes.isOut(type)) {
        this.outs += 1;
      }

      // Check if inning is over
      if (Inning.isOver(this.outs)) {
        return isInningOver = true;
      }

      // Parse play types
      switch (type) {
        case '1b': {
          this.runs = bases.advanceRunners(1, this.runs);
          break;
        }

        case '2b': {
          this.runs = bases.advanceRunners(2, this.runs);
          break;
        }

        case '3b': {
          this.runs = bases.advanceRunners(3, this.runs);
          break;
        }

        case 'hr': {
          this.runs = bases.advanceRunners(4, this.runs);
          break;
        }

        case 'bb': {
          const isWalkOrHbp = true;
          this.runs = bases.advanceRunners(1, this.runs, isWalkOrHbp);
          break;
        }

        case 'hbp': {
          const isWalkOrHbp = true;
          this.runs = bases.advanceRunners(1, this.runs, isWalkOrHbp);
          break;
        }

        case 'e': {
          this.runs = bases.advanceRunners(1, this.runs);
          break;
        }

        case 'out': {
          const isWalkOrHbp = false;
          const isOut = true;

          if (this.outs < 3) {
            this.runs = bases.advanceRunners(1, this.runs, isWalkOrHbp, isOut);
          }
          break;
        }

        default: {
          return;
        }
      }
    });

    this.endInning(bases, this.outs, this.runs);
  }

  static isOver(outs) {
    return outs === 3;
  }

  endInning(bases, outs, runs) {
    console.log(`Bases: ${bases.formatResults()}, Outs: ${outs}, Runs: ${runs}`);
  }
}

module.exports = Inning;
