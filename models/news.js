const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ClubInfoSchema = new Schema(
  {
    title: String,
    desc: String,
    tag: String
  }
)

module.exports = mongoose.model('ClubInfo', ClubInfoSchema);