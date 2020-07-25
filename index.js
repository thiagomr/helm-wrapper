const Helm = require('./lib/helm');
const singleton = new Helm();

module.exports = singleton;
