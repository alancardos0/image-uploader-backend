const mongoose = require('mongoose')
const { Schema } = mongoose;

const newPicture = new Schema({
  path: String,
  imgType: String,
  file: String
})

const Picture = mongoose.model('picture', newPicture)
console.log(Picture)
module.exports = Picture