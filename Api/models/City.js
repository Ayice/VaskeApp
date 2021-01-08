const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CitySchema = new Schema({
  title: { type: String, required: true },
  postnummer: { type: Number },
});

module.exports = mongoose.model('City', CitySchema);
