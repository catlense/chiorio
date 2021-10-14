const mongoose = require('mongoose')

const Client = require('./models/Client')
const Log = require('./models/Log')

const json = require('./clients.json')

mongoose.connect('mongodb://127.0.0.1:27017/chiorio').then(() => console.log('MongoDB Connected')).catch(err => console.log('MONGODB ERR\n', err))

json.forEach(async e => {

    const client = new Client({
        uid: e.uid,
        name: String(e.name),
        phone: Number(e.phone),
        count: +e.count
    })

    await client.save().then(e => console.log(`[CLIENT] ${e.uid}. ${e.phone} saved`))

})