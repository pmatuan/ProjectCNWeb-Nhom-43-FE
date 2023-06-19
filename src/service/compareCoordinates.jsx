function compareCoordinates(pointA, pointB) {
  var latitudeDiff = Math.abs(pointA.latitude - pointB.latitude);
  var longitudeDiff = Math.abs(pointA.longitude - pointB.longitude);

  return latitudeDiff < 0.5 && longitudeDiff < 0.5;
}

export default compareCoordinates;
