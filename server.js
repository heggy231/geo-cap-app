const express = require('express');
const app = express();

const ex6Renderer = require('express-es6-template-engine');
app.engine('html', ex6Renderer);
app.set('views', 'templates');
app.set('view engine', 'html');

const cities = require('./node_modules/country-json/src/country-by-capital-city.json');
// console.log(cities);
const population = require('./node_modules/country-json/src/country-by-population.json');
// console.log(population);

// middleware
app.use(express.json()); // for parsing app/json
app.use(express.static('public'));

app.get('/cities', (req, res) => {
  res.json(cities);
});

app.get('/population', (req, res) => {
  res.json(population);
});

// param name url: localhost:8000/countries?name=aus
app.get('/countries', (req, res) => {
  // res.json(population);
  // res.json(cities);
  // console.log("req: $$$$$$ !!!!!!!!!!!!!! ***", req);
  // console.log("req.query:$#$$$ !!!!!!!!!!!!!!!!", req.query);
  let results = "There are no countries here!";

  if(req.query.name){
    const reqName = req.query.name.toLocaleLowerCase();

    results = cities.filter( city => {
      return city.country.toLowerCase().indexOf(reqName) > -1;
    }).map( city => {
      return city.country;
    });
    console.log("resulTTTTT~~~~~~~~~: $$$$$$ !!!!!!!!!!!!!! ***", results);
  }
  res.render("countries", {
    locals: {
      country: results
    }
  });
});

app.get('/heartbeat', (req, res) => {
  res.json({
    "is": "working"
  });
});

app.get("*", (req, res) => {
  res.send("catch all");
});

app.listen('8000', () => {
  console.log('server 8000 running');
});