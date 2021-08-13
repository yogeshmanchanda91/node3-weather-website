const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("../src/utils/geocode");
const forecast = require("../src/utils/forecast");

const app = express();
// Define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//setup handlebars and viewPath location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Yogesh",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Yogesh",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Yogesh",
    helpText: "We are here to help!",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide the address",
    });
  } else {
    geocode(
      req.query.address,
      (error, { longitude, latitude, location } = {}) => {
        if (error) {
          return res.send({
            error: error,
          });
        }
        forecast(longitude, latitude, (error, { data: forecastData } = {}) => {
          if (error) {
            return res.send({
              error: error,
            });
          }
          res.send({
            location: location,
            address: req.query.address,
            forecast: forecastData,
          });
        });
      }
    );
  }

  // res.send({
  //   forecast: "The weather is good",
  //   location: "Ferozepur City",
  //   address: req.query.address,
  // });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Yogesh",
    errorMessage: "Help article not found!!!",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404 Error",
    name: "Yogesh",
    errorMessage: "Page not found!!!",
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000!");
});

// app.get("", (req, res) => {
//   res.send("Hello express!");
// });

// app.get("/help", (req, res) => {
//   res.send("Help Page!");
// });

// app.get("/about", (req, res) => {
//   res.send("<h1>About Page!</h1>");
// });
