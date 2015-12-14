exports.getAggregationBin = function(startTime, endTime) {
// Determine the bin based on the temporal range of the start / end date
  var time = new Date(endTime).getUTCFullYear() - new Date(startTime).getUTCFullYear();
  var timeBin = 'day';

  // This should probably be configurable by project to select the binning
  // that makes the most sense for the expected temporal range of the data
  if (time > 100) {
    timeBin = 'decade';
  } else if (time > 50) {
    timeBin = 'lustrum';
  } else if (time > 25) {
    timeBin = 'year';
  } else if (time > 10) {
    timeBin = 'season';
  } else if (time > 1) {
    timeBin = 'month';
  } else {
    // Convert to days
    time = (endTime - startTime) / 86400000;
    if (time > 14) {
      timeBin = 'day';
    } else if (time > 3) {
      timeBin = 'hour';
    } else {
      timeBin = 'minute';
    }
  }
  return timeBin;
}
