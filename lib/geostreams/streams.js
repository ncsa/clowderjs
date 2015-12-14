var request = require('request');

exports.get = function(auth, callback) {
  request
    .get(auth.api + '/geostreams/streams', {gzip: true}, function(err, response, body){
      if (err) callback(err);
      try {
        callback(JSON.parse(body));
      } catch(e) {
        callback(body);
      }
    });
};
