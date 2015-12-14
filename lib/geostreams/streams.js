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

exports.patch = function(auth, streamID, body, callback) {
  var options = {
    auth: {
      user: auth.authorId,
      pass: auth.password
    },
    json: true,
    body: body,
    gzip: true
  };

  request
    .patch(auth.api + '/geostreams/streams/' + streamID, options, function (err, response, body) {
      if (err) callback(err);
      try {
        callback(JSON.parse(body));
      } catch (e) {
        callback(body);
      }
    });
};