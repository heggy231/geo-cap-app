const express = require('express');

const namesAndCapitals = require('./node_modules/country-json/src/country-by-capital-city.json');
const populations = require('./node_modules/country-json/src/country-by-population.json');

const app = express();

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

app.get('/countries', (req, res) => {
  let results = namesAndCapitals;
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
  }

  return res.json(results);
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