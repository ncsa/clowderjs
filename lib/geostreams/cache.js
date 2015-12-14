var request = require('request');
var async = require('async');

var sensors = require('./sensors');
var getAggregationBin = require('./datapoints')['getAggregationBin'];

exports.get = function(auth, callback) {
  request.get(auth.api + "/geostreams/cache", {gzip: true}, function(err, response, body) {
    if (err) callback(err);
    try {
      callback(JSON.parse(body));
    } catch (e) {
      callback(body);
    }
  });
}
exports.status = exports.get;

exports.invalidate = function(auth, callback) {
  var options = {
    auth: {
      user: auth.authorId,
      pass: auth.password
    },
    json: true
  };

  request.get(auth.api + "/geostreams/cache/invalidate", options, function(err, response, body) {
    if (err) callback(err);
    try {
      callback(JSON.parse(body));
    } catch (e) {
      callback(body);
    }
  });
}

exports.primeAll = function(auth, callback) {
  sensors.get(auth, function(sensors) {
    async.eachSeries(sensors, function iterator(sensor, cb) {
      var t = getAggregationBin(sensor['min_start_time'], sensor['max_end_time']);
      request.get(auth.api + "/geostreams/datapoints/bin/" + t + "/1?sensor_id=" + sensor['id'], {gzip: true, json: true}, function(error, response, body) {
        if (!error && response.statusCode == 200) {
          cb();
        } else {
          console.log(error);
          cb(error);
        }
      });
    }, function done(){
      console.log('priming of cache is complete.');
    });
  console.log('priming cache for all sensors...');
});
}
