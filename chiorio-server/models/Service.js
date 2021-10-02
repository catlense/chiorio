const mongoose = require('mongoose')
let Schema = mongoose.Schema

let schema = new Schema({
    uid: Number,
    name: String,
    price: String,
    bonus: Boolean
})

module.exports = mongoose.model('service', schema)