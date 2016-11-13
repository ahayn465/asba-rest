
var express = require("express");
var app = express();

app.get("/breweries", function(req, res){
  console.log(req);
  res.json([
    {"id" : "1", "name" : "Alley Kat Brewery", "address" : "9929 60 Ave NW", "city" : "Edmonton", "phone" : "(780)436-8922", "latd" : "0", "longd" : "0"}
  ])
});

app.listen(4200);
