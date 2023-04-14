const mongoose = require('mongoose')
const Schema = mongoose.Schema

const shortURLSchema = new Schema({
  InputURL: {
    type: String,
    required: true,
    unique: true,
  },
  finalURL: {
    type: String,
    required: true,
    unique: true,
  },
  done: {
    type: Boolean
  }
})

module.exports = mongoose.model('short-urls', shortURLSchema)