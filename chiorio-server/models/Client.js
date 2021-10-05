const mongoose = require('mongoose')
let Schema = mongoose.Schema

let schema = new Schema({
    uid: Number,
    name: String,
    phone: String,
    count: Number
})

module.exports = mongoose.model('client', schema)