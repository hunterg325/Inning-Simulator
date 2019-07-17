class PlayTypes {
  constructor(types) {
    this.types = types;
    this.validTypes = ['out', 'k', '1b', '2b', '3b', 'hr', 'e', 'bb', 'hbp'];
  }

  parseTypes() {
    return this.types.toString().split(',');
  }

  isValid(type) {
    return this.validTypes.includes(type);
  }

  isOut(type) {
    return type === 'out' || type === 'k';
  }
}

module.exports = PlayTypes;
