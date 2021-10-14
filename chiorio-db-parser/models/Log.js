const mongoose = require('mongoose')
let Schema = mongoose.Schema

let schema = new Schema({
    uid: Number,
    date: String,
    time: String,
    master: String,
    client: String,
    phone: String,
    count: Number,
    service: String,
    servicePrice: Number,
    serviceCount: Number,
    product: String,
    productPrice: Number,
    productCount: Number,
    productSummary: Number,
})

module.exports = mongoose.model('log', schema)