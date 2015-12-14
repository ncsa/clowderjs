function Clowder() {
  this.connect = function(options) {
    return new Config(options);
  };
  this.datasets = require('./datasets');
  this.geostreams = require('./geostreams');
}

var Config = function(options) {
  this.domain    = options.url;
  this.clowder   = (process.env.NODE_ENV == 'local') ? this.domain : this.domain + "/clowder";
  this.api       = this.clowder + "/api";
  this.authorId  = options.username;
  this.password  = options.password;

  return this;
};

module.exports = exports = new Clowder();
