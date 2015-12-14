// In this example, we get a list of all the streams in the geostreams api
// We then get the list of datasets that the current user owns
// If a dataset and a stream have the same name,
// we add the stream's metadata to the dataset
// Note: ideally this script will have a publicly available
// url that you would assign to "extractor_id"

var clowder = require('clowderjs');
var config = require('clowder.json')['dev'];
var auth = clowder.connect(config);

// ideally each extractor will have a permanent url that is versioned
// if using a public git repo, use the SHA that points to the specific commit for the version
// of this script that you are running
var extractor_id = "https://github.com/USER/PROJECT/blob/SHA/path/to/file.js";

// get all the streams in the geostreams api
clowder.geostreams.streams.get(auth, function(streamsFound){

  // get a list of all of the datasets that I own
  clowder.datasets.getMine(auth, function(datasets){

    // for each of my datasets...
    _.each(datasets, function(dataset) {

      // find a stream that has the same name as this dataset
      var stream = _.findWhere(streamsFound, {name: dataset.name});

      // if there is a dataset with the same name...
      if (stream) {

        // build the metadata json object
        var metadataJSON = {
          "@context": {
            "Longitude": "http://www.w3.org/2003/01/geo/wgs84_pos#long",
            "Latitude": "http://www.w3.org/2003/01/geo/wgs84_pos#lat",
            "Altitude": "http://www.w3.org/2003/01/geo/wgs84_pos#alt",
            "Parameters": "http://clowder.ncsa.illinois.edu/clowder/geostreams/parameters",
            "start_time": "http://www.w3.org/2001/XMLSchema#dateTime",
            "end_time": "http://www.w3.org/2001/XMLSchema#dateTime"
          },
          "agent": {
            "@type": "cat:extractor",
            "extractor_id": extractor_id
          },
          "content": {
            "Longitude": stream.geometry.coordinates[0],
            "Latitude": stream.geometry.coordinates[1],
            "Altitude": stream.geometry.coordinates[2],
            "Parameters": stream.params,
            "start_time": stream.start_time,
            "end_time": stream.end_time
          }
        };

        // POST the metadata to the dataset and log the response
        clowder.datasets.addExtractorMetadata(auth, dataset.id, metadataJSON, function(response) {
          console.log(response);
        });
      }
    });
  });
};
