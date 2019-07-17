const Inning = require('./src/Inning');

const inning = new Inning(process.argv[2]);

inning.play();
