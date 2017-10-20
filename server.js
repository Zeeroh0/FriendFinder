var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();
var PORT = process.env.PORT || 1300;
 
// create application/x-www-form-urlencoded parser
app.use(bodyParser.urlencoded({ extended: true }));

// parse various different custom JSON types as JSON
app.use(bodyParser.json({ type: 'application/*+json' }))
 
// parse some custom thing into a Buffer
app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }))
 
// parse an HTML body into a string
app.use(bodyParser.text({ type: 'text/html' }))


// API Routes import
require('./app/routing/apiRoutes.js')(app);
// HTML Routes import
require('./app/routing/htmlRoutes.js')(app);

 
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
