const request = require("request");

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoiemFuZWFybXN0cm9uZyIsImEiOiJja2NnaThuYm4wY2xxMndsaXlqeHFsOXNxIn0.qXgWPoBTUUHW6vcT0tYpcA&limit=1";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to location services.", undefined);
    } else if (body.features.length === 0) {
      callback("Unable to find location, try another search.", undefined);
    } else {
      callback(undefined, {
        coordinates: body.features[0].center,
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
