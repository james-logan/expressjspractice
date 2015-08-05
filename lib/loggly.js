var loggly = require('loggly');

function logger (tag) {
  var log = loggly.createClient({
    token: process.env.LOGGLY_TOKEN,
    subdomain: 'jameslogan',
    tags: ['NodeJS', tag],
    json: true
  });
  return log;
}

module.exports = logger;
