const getLocation = () => {
  if (navigator.geolocation) {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => resolve(position.coords),
        (error) => reject(error)
      );
    });
  } else {
    throw new Error("Trình duyệt không hỗ trợ Geolocation.");
  }
};

const getCoordinates = async () => {
  try {
    const coords = await getLocation();
    const latitude = coords.latitude;
    const longitude = coords.longitude;
    return { latitude, longitude };
  } catch (error) {
    console.error(error);
  }
};

export default getCoordinates;