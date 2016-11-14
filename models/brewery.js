var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BrewerySchema = new Schema({
  name: String,
  description: String,
  address: String,
  city: String,
  phone: String,
  latd: Number,
  longd: Number
});


module.exports = mongoose.model("Brewery", BrewerySchema)
