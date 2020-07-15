const request = require("request");

const forecast = (coordinates, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=520fa09cb34d03a3a5ba71f822e3620c&query=" +
    coordinates +
    "&units=f";

  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback("Unable to connect to weather services.", undefined);
    } else if (body.error) {
      callback("Unable to find forecast, try another search.", undefined);
    } else {
      callback(
        undefined,
        body.current.weather_descriptions[0] +
          ". At " +
          body.current.observation_time +
          " the temperature in " +
          body.location.name +
          " was " +
          body.current.temperature +
          ". It feels like " +
          body.current.feelslike +
          "."
      );
    }
  });
};

module.exports = forecast;
