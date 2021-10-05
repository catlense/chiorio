const express = require('express')
const app = express()
const mongoose = require('mongoose')

const config = require('./config')

const cors = require('cors');

mongoose.connect('mongodb://127.0.0.1:27017/chiorio').then(() => console.log('MongoDB Connected')).catch(err => console.log('MONGODB ERR\n', err))

const Master = require('./models/Master')
const Service = require('./models/Service')
const Client = require('./models/Client')
const Log = require('./models/Log')

app.use(cors());
app.options('*', cors());


// Client module
app.get('/createClient/:phone/:name', async(req, res) => {
    const client = new Client({
        uid: await Client.count() + 1,
        name: req.params.name,
        phone: req.params.phone,
        count: 0
    })

    await client.save()

    res.status(201).json({response: client})
})

app.get('/getClient/:phone', async(req, res) => {
    return res.status(200).json({response: await Client.findOne({phone: req.params.phone})})
})

app.get('/addJoin/:phone/:master/:ids/:servicePrice', async(req, res) => {
    const client = await Client.findOne({phone: req.params.phone})

    if(!client) { return res.status(404).json({'response':'user not found'}) }

    client.count += 1

    await client.save()

    let service = await Service.find({uid: req.params.ids.toString().split(',')})
    let serviceName = ''
    service.forEach(element => serviceName = serviceName + element.name + ',')
    serviceName = serviceName.substring(0, serviceName.length - 1)

    const log = await new Log({
        uid: await Log.count() + 1,
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
        master: req.params.master,
        client: client.name,
        phone: req.params.phone,
        count: client.count,
        service: serviceName,
        servicePrice: req.params.servicePrice,
        serviceCount: service.length,
    })

    await log.save()

    res.status(200).json({'response': client})
})

app.get('/getSummary/:ids', async(req, res) => {
    const services = await Service.find({uid: req.params.ids.toString().split(',')})
    let summary = 0

    services.forEach(element => summary += element.price)
    res.status(200).json({response: summary})
})

// /service page functions

app.get('/getServices', async(req, res) => {
    return res.status(200).json({response: await Service.find({})})
})

app.get('/getService/:id', async(req, res) => {
    return res.status(200).json({response: await Service.findOne({uid: req.params.id})})
})

app.get('/createService/:name/:price/:bonus', async(req, res) => {
    const service = await new Service({
        uid: await Service.count() + 1,
        name: req.params.name,
        price: req.params.price,
        bonus: !!req.params.bonus
    })

    await service.save()

    res.status(201).json({response: service})
})


// /select page functions

app.get('/getMasters', async(req, res) => {
    return res.status(200).json({response: await Master.find({})})
})

app.get('/getMaster/:id', async(req, res) => {
    const master = await Master.findOne({uid: req.params.id})
    res.status(200).json({response: (master ? master : 'master not found')})
})

app.get('/createMaster/:name/:photo', async(req, res) => {
    // res.status(200).json({response: [req.params.name, req.params.photo]})
    const master = new Master({
        uid: await Master.count() + 1,
        name: req.params.name,
        photo: req.params.photo
    })

    await master.save()

    res.status(201).json({response: master})
})

app.get('/img/:img', (req, res) => {
    res.sendFile(__dirname + '/img/' + req.params.img)
})

app.get('/', (req, res) => {
    res.status(200).json({response: "OK"})
})

app.listen(config.PORT, () => console.log(`Server has been started on ${config.PORT} port...`))