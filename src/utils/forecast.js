const request = require("request");

const forecast = (longitude, latitude, callback) => {
  const forecastURL = `https://api.weatherapi.com/v1/forecast.json?key=255d66a8cd16471691e145351210707&q=${longitude},${latitude}&days=1&aqi=no&alerts=no`;

  request({ url: forecastURL, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (body.error) {
      callback(body.error.message);
    } else {
      callback(undefined, {
        data: `It is currently ${body.current.temp_c} degree out and its a ${body.current.condition.text} day expected today. Chances of rain are ${body.current.precip_in}%. `,
      });
    }
  });
};

module.exports = forecast;

// const forecast = (longitude, latitude, callback) => {
//   const forecastURL = `https://api.weatherapi.com/v1/forecast.json?key=255d66a8cd16471691e145351210707&q=${longitude},${latitude}&days=1&aqi=no&alerts=no`;

//   request({ url: forecastURL, json: true }, (error, response) => {
//     if (error) {
//       callback("Unable to connect to weather service!", undefined);
//     } else if (response.body.error) {
//       callback(response.body.error.message);
//     } else {
//       callback(undefined, {
//         data: `It is currently ${response.body.current.temp_c} degree out and its a ${response.body.current.condition.text} day expected today. Chances of rain are ${response.body.current.precip_in}%. `,
//       });
//     }
//   });
// };
