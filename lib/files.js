var fs = require('fs');
var request = require('request');

/**
 * Download file by ID
 * @param auth
 * @param fileID
 * @param callback
 */
exports.download = function(auth, fileID, callback) {
  var options = {
    auth: {
      user: auth.authorId,
      pass: auth.password
    },
    json: true,
    gzip: true
  };

  if (!fileID) {
    throw new Error("FileID required.");
  }

  request
    .get(auth.api + '/files/' + fileID + '/blob', options, function(err, response, responseBody){
      if (err) callback(err);
      try {
        callback(JSON.parse(responseBody));
      } catch(e) {
        callback(responseBody);
      }
    });
};

/**
 * Upload a File to a Dataset
 * @param auth
 * @param datasetID
 * @param filepath
 * @param callback
 */
exports.uploadToDataset = function(auth, datasetID, filepath, callback) {
  var options = {
    auth: {
      user: auth.authorId,
      pass: auth.password
    },
    url: auth.api + '/uploadToDataset/' + datasetID,
    json: true,
    gzip: true,
    formData: {
      File: fs.createReadStream(filepath)
    }
  };

  if (!datasetID) {
    throw new Error("Dataset ID required.");
  }

  request
    .post(options, function(err, response, responseBody){
      if (err) callback(err);
      try {
        callback(JSON.parse(responseBody));
      } catch(e) {
        callback(responseBody);
      }
    });
};