
var express = require("express");
var app = express();
bodyParser = require('body-parser');
var mongoose = require('mongoose');

// database schemas
var Brewery = require('./models/brewery.js');

// enable retrieving data from POST with body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// *** DATABASE ***
// connect to remote mongoos instance
mongoose.connect('mongodb://asba-admin:#IloveBeer@ds149557.mlab.com:49557/asba');


// *** Routes for API ***
var router = express.Router();

router.get('/', function(req, res) {
  res.json({ message : "Cheers! You made it!" });
});

router.get("/breweries", function(req, res){
  res.json([
    {"id" : "1", "name" : "Alley Kat Brewery", "address" : "9929 60 Ave NW", "city" : "Edmonton", "phone" : "(780)436-8922", "latd" : "0", "longd" : "0"},
    {"id" : "2", "name" : "Alley Kat Brewery", "address" : "9929 60 Ave NW", "city" : "Edmonton", "phone" : "(780)436-8922", "latd" : "0", "longd" : "0"}
  ])
});

// Register the routes and define prefix of /api
app.use('/api', router);

var port = process.env.PORT || 4200;
app.listen(port);
console.log("Happy Hour happens on port " + port);
