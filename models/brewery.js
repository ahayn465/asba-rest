var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BrewerySchema = new Schema({
  name: String,
  email: String,
  image: String,
  website: String,
  description: String,
  address: String,
  city: String,
  phone: String,
  latd: String,
  longd: String,
  placeId: String[],
  instagram: String,
  twitter: String,
  facebook String
});


module.exports = mongoose.model("Brewery", BrewerySchema)
