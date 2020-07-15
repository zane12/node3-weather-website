const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

console.log(__dirname);

//define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

const app = express();

const port = process.env.PORT || 3000;

//setup handlebars engine and views location
app.set("views", viewsPath);
app.set("view engine", "hbs");
hbs.registerPartials(partialsPath);

//setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Zane",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Zane",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpMessage: "Let me out, I'm trapped in the server.",
    title: "Help",
    name: "Zane",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide a location.",
    });
  }
  geocode(req.query.address, (error, { coordinates, location } = {}) => {
    if (error) {
      return res.send({ error });
    }

    forecast(coordinates.reverse(), (error, forecastData) => {
      if (error) {
        return res.send({ error });
      }

      res.send({
        forecast: forecastData,
        location,
        address: req.query.address,
      });
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term.",
    });
  }

  console.log(req.query.search);
  res.send({
    products: [],
  });
});

// app.com
// app.com/help
// app.com/about
app.get("/help/*", (req, res) => {
  res.render("404", {
    errorMessage: "Help article not found",
    title: "404",
    name: "Zane",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    errorMessage: "You poopied your doopie",
    title: "404",
    name: "Zane",
  });
});

app.listen(port, () => {
  console.log("Server is up on port " + port + ".");
});
