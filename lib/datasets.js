var request = require('request');
var _ = require('underscore');

var self = this;

exports.get = function(auth, limit, callback) {
  limit = limit || 0;
  var options = {
    auth: {
      user: auth.authorId,
      pass: auth.password
    },
    json: true
  };

  request
    .get(auth.api + '/datasets?limit=' + limit, options, function(err, response, body){
      if (err) callback(err);
      try {
        callback(JSON.parse(body));
      } catch(e) {
        callback(body);
      }
    });
};

exports.getMine = function(auth, callback) {
  self.get(auth, 0, function(response) {
    callback(_.filter(response, function(dataset) {
      return dataset.authorId == auth.authorId;
    }));;
  });
};

exports.addExtractorMetadata = function(auth, datasetID, body, callback) {
  var options = {
    auth: {
      user: auth.authorId,
      pass: auth.password
    },
    json: true,
    body: body
  };

  var sampleBody = {
    "@context": {
        "term1":"http://..."
    },
    "agent": {
      "@type": "cat:extractor",
      "extractor_id": "http://..."
    },
    "content": {
      "term1": "value"
    }
  };

  if (!body || !body.agent || !body.agent['@type'] || !body.agent.extractor_id || !body.content) {
    throw new Error("Metadata body is invalid. See example body: " + JSON.stringify(sampleBody));
  }

  request
    .post(auth.api + '/datasets/' + datasetID + '/metadata.jsonld', options, function(err, response, responseBody){
      if (err) callback(err);
      try {
        callback(JSON.parse(responseBody));
      } catch(e) {
        callback(responseBody);
      }
    });
};
