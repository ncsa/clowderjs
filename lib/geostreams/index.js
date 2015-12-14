var request = require('request');

exports.cache = require('./cache');
exports.datapoints = require('./datapoints');
exports.sensors = require('./sensors');
exports.streams = require('./streams');

exports.counts = function(auth, callback) {
  request.get(auth.api + "/geostreams/counts", {gzip: true}, function(err, response, body) {
    if (err) callback(err);
    try {
      callback(JSON.parse(body));
    } catch (e) {
      callback(body);
    }
  });
};
