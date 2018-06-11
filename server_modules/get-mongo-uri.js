const nconf = require('nconf');

nconf.argv().env().file('config.json'); // loads contents of config file

let production = process.env.NODE_ENV; // determines if env is in production or development

// returns the appropriate configuration
let conf = nconf.get(
  production
  ? 'mongo-prod'
  : 'mongo-dev'
);

// returns the appropriate uri
let uri  = (
  production
  ? `mongodb://${conf.user}:${conf.pass}@${conf.host}:${conf.port}/${conf.base}`
  : `mongodb://${conf.host}:${conf.port}/${conf.base}`
);

module.exports = function() {
  return uri;
}
