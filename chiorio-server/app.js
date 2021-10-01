const express = require('express')
const app = express()
const mongoose = require('mongoose')

const config = require('./config')

mongoose.connect('mongodb://127.0.0.1:27017/chiorio').then(() => console.log('MongoDB Connected')).catch(err => console.log('MONGODB ERR\n', err))

const Master = require('./models/Master')

app.get('/img/:img', (req, res) => {
    res.sendFile(__dirname + '/img/' + req.params.img)
    // console.log(req.params.img)
})

app.get('/', (req, res) => {
    res.status(200).json({response: "OK"})
})

app.listen(config.PORT, () => console.log(`Server has been started on ${config.PORT} port...`))