const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const CoachSchema = new Schema(
  {
    name: String,
    ID: Number
  }
)

module.exports = mongoose.model('Coach', CoachSchema);