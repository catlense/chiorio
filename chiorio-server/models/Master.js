const mongoose = require('mongoose')
let Schema = mongoose.Schema

let schema = new Schema({
    uid: Number,
    name: String,
    photo: String
})

module.exports = mongoose.model('master', schema)