function toRadians(degrees) {
  return degrees * (Math.PI / 180);
}

function getDistance(pointA, pointB) {
  const earthRadius = 6371; // Đường kính trái đất (đơn vị: km)

  const latA = toRadians(pointA.latitude);
  const lonA = toRadians(pointA.longitude);
  const latB = toRadians(pointB.latitude);
  const lonB = toRadians(pointB.longitude);

  const deltaLat = latB - latA;
  const deltaLon = lonB - lonA;

  const a =
    Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
    Math.cos(latA) * Math.cos(latB) * Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = earthRadius * c;
  return distance;
}

export default getDistance;
