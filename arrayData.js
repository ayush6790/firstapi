const mongoose = require('mongoose');

const arrayDataSchema = new mongoose.Schema({
  song: String, 
  band: String,
  year: Number,
  banger: Boolean
});

const ArrayData = mongoose.model('ArrayData', arrayDataSchema);

module.exports = ArrayData;
