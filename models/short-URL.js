const mongoose = require('mongoose')
const Schema = mongoose.Schema

const shortURLSchema = new Schema({
  InputURL: {
    type: String,
    required: true,
  },
  finalURL: {
    type: String,
    required: true,
  },
  done: {
    type: Boolean
  }
})

module.exports = mongoose.model('short-urls', shortURLSchema)