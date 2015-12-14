var request = require('request');

exports.get = function(auth, callback) {
  request
    .get(auth.api + '/geostreams/sensors', {gzip: true}, function(err, response, body){
      if (err) callback(err);
      try {
        callback(JSON.parse(body));
      } catch(e) {
        callback(body);
      }
  });
};

exports.update = function(auth, callback) {
  var options = {
    auth: {
      user: auth.authorId,
      pass: auth.password
    },
    json: true,
    gzip: true
  };

  request
    .get(auth.api + '/geostreams/sensors/update', options, function(err, response, body){
      if (err) callback(err);
      try {
        callback(JSON.parse(body));
      } catch(e) {
        callback(body);
      }
    });
};