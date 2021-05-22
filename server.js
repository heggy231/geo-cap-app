const express = require('express');
const es6Renderer = require('express-es6-template-engine');
const morgan = require('morgan');

const app = express();
const logger = morgan('tiny');

const namesAndCapitals = require('./node_modules/country-json/src/country-by-capital-city.json');
const populations = require('./node_modules/country-json/src/country-by-population.json');

// __dirname is root of my project, folder /public will be static location, middleware hint is app.use
app.use(express.static(__dirname + '/public'));
// morgan log btwn every req, res it will info about them
app.use(logger);

app.engine('html', es6Renderer);
app.set('views', 'templates');
app.set('view engine', 'html');

app.get('/heartbeat', (req, res) => {
  // res.send('Hi I am heartbeat!');
  res.json({
    "is":"working",
    "yum":"ice cream"
  });
});

// pick which Query Param is coming in
const handleGeoQuery = (capital, name) => {
  // is it capital or name? check if both reject
  if (capital && name) {
    return ['Please enter only one: capital or name'];
  } else if (name){
    return namesAndCapitals.filter(x => {
      return x.country && x.country.toLowerCase().indexOf(name.toLowerCase()) > -1;
    }); 
  } else {
    return namesAndCapitals.filter(x => {
      return x.city && x.city.toLowerCase().indexOf(capital.toLowerCase()) > -1;
    });
  }
};

const handlePopQuery = (minpop, maxpop) => {
  if (minpop && maxpop) {
    // conversion in millions, add 6 zeros
    maxpop += '000000';
    minpop += '000000';
    return populations.filter(x => {
      return x.population && x.population <= maxpop && x.population >= minpop;
    });
  } else {
    return ['Please enter both: minpop and maxpop'];
  }
};

app.get('/countries/a-e', (req, res) => {
  // filter only countries name start with a 
  let namesAE = namesAndCapitals.filter(item => {
    console.log('before!!!!!!! $$$$$$$$', item.country);
    if (
      item.country.charAt(0) === 'A' ||
      item.country.charAt(0) === 'B' ||
      item.country.charAt(0) === 'C' ||
      item.country.charAt(0) === 'D' ||
      item.country.charAt(0) === 'E'
    ) {
      console.log('after!!!!!!! $$$$$$$$', item.country);
      return item;
    }
  });
  res.send(namesAE);
});

app.get('/countries/f-l', (req, res) => {
  let namesFL = namesAndCapitals.filter(item => {
    if (
      item.country.charAt(0) === 'F' ||
      item.country.charAt(0) === 'G' ||
      item.country.charAt(0) === 'H' ||
      item.country.charAt(0) === 'I' ||
      item.country.charAt(0) === 'J' ||
      item.country.charAt(0) === 'K' ||
      item.country.charAt(0) === 'L'
    ) {
      return item;
    }
  });
  res.send(namesFL);
});

app.get('/countries/m-r', (req, res) => {
  let namesMR = namesAndCapitals.filter(item => {
    if (
      item.country.charAt(0) === 'M' ||
      item.country.charAt(0) === 'N' ||
      item.country.charAt(0) === 'O' ||
      item.country.charAt(0) === 'P' ||
      item.country.charAt(0) === 'Q' ||
      item.country.charAt(0) === 'R'
    ) {
      return item;
    }
  });
  res.send(namesMR);
});

app.get('/countries/s-v', (req, res) => {
  let nameSV = namesAndCapitals.filter(item => {
    if (
      item.country.charAt(0) === 'S' ||
      item.country.charAt(0) === 'T' ||
      item.country.charAt(0) === 'U' ||
      item.country.charAt(0) === 'V' 
    ) {
      return item;
    }
  });
  res.send(nameSV);
});

app.get('/countries/w-z', (req, res) => {
  let nameWZ = namesAndCapitals.filter(item => {
    if (
      item.country.charAt(0) === 'W' ||
      item.country.charAt(0) === 'X' ||
      item.country.charAt(0) === 'Y' ||
      item.country.charAt(0) === 'Z' 
    ) {
      return item;
    }
  });
  res.send(nameWZ);
});

app.get('/countries', (req, res) => {
  let results = [];
  // destructing name = req.query.name, capital = req.query.capital
  let {capital, maxpop, minpop, name} = req.query;
  console.log('!!!!! $$$$$$ The country is !!!!! ****** $$$$$$ =====>', name);
  console.log('!!!!! $$$$$$ The Capital is !!!!! ****** $$$$$$ =====>', capital);
  console.log('!!!!! $$$$$$ MaxPop is !!!!! ****** $$$$$$ =====>', maxpop);
  console.log('!!!!! $$$$$$ MinPop is !!!!! ****** $$$$$$ =====>', minpop);
  // filter res base on req.query param name
  if (capital || name) {
    results = handleGeoQuery(capital, name);
  } else if (minpop || maxpop) {
    results = handlePopQuery(minpop, maxpop);
  // if no query param 
  } else if (Object.keys(req.query).length === 0){
    results = namesAndCapitals;
  } else {
    results = ['Query param is not recognized.'];
  }
  res.render('home', {
    locals: {
      countries: results
    }
  });
});

app.get('/*', (req, res) => {
  res.json({
    namesAndCapitals,
    populations
  });
});

app.listen('8080', () => {
  console.log('The server is running at port 8080');
});