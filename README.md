## Classwork
- Create an MVP application that helps students learn rudimentary data about countries. Below is the acceptance criteria
- As a user, I want to see a list of countries with their respective capitals and populations at the endpoint /countries.
- As a user, I want to search for countries with a string of characters that returns only those countries that have the string in their name. For example, /countries?name=aus should return Australia, Austria, and any other countries that have aus anywhere in their name. The search must be case insensitive.
As a user, I want to search for countries by the names of their respective capitals with a string of characters that returns only those countries whose capitals have the string in their name. For example, /countries?capital=hel should return Finland and any other countries that have hel in their name.
As a user, I want to search for countries whose populations are greater than some number and also less than some number. For example, /countries?popmin=100&popmax=150 should return the data on all countries whose population falls between 100 million and 150 million
- Use express.static to serve files from public/ that you need to enhance your application (e.g. CSS and JS)
- Use morgan middleware to log the minimal output of each request
- Use a template engine of your choice, such as express-es6-template-engine, to create the HTML structure that the browser will render
- The data will come from country-json