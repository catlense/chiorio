const express = require('express')
const app = express()
const mongoose = require('mongoose')

const config = require('./config')

const cors = require('cors');
const mailer = require('nodemailer')

mongoose.connect('mongodb://127.0.0.1:27017/chiorio').then(() => console.log('MongoDB Connected')).catch(err => console.log('MONGODB ERR\n', err))

const Master = require('./models/Master')
const Service = require('./models/Service')
const Client = require('./models/Client')
const Log = require('./models/Log')

app.use(cors());
app.options('*', cors());


setInterval(async() => {

    if (new Date().getHours() === 19 && new Date().getMinutes() === 50) {

        const fs = require('fs')
        const path = require('path')
        const json2csv = require('json2csv').parse

        const convertCsvToXlsx = require('@aternus/csv-to-xlsx');

        const log = await Log.find({})

        const date = new Date().toLocaleDateString().replace('.', '-').replace('.', '-') + '.' + new Date().toLocaleTimeString().replace(':', '-').replace(':', '-')

        const fields = [
            {
                label: 'Порядковый номер',
                value: 'uid'
            },
            {
                label: 'Дата',
                value: 'date'
            },
            {
                label: 'Время',
                value: 'time'
            },
            {
                label: 'Имя мастера',
                value: 'master'
            },
            {
                label: 'Имя клиента',
                value: 'client'
            },
            {
                label: 'Номер телефона',
                value: 'phone'
            },
            {
                label: 'Посещение',
                value: 'count'
            },
            {
                label: 'Услуги',
                value: 'service'
            },
            {
                label: 'Количество услуг',
                value: 'serviceCount'
            },
            {
                label: 'Стоимость услуг',
                value: 'servicePrice'
            }]

        let csv

        try {
            csv = json2csv(log, { fields }, { withBOM: true })
        } catch (err) {
            res.status(500).json({ err })
        }

        const filePath = path.join(__dirname, 'exports', 'export-' + date + '.csv')
        fs.writeFile(filePath, csv, (err) => {
            if (err) {
                return res.status(500).json({ err })
            } else {
                setTimeout(function () {
                    fs.unlinkSync(filePath); // delete this file after 30 seconds
                }, 30000)
                let source = filePath
                let destination = path.join(__dirname, 'exports', 'export-' + date + '.xlsx')

                convertCsvToXlsx(source, destination)
            }
        })


        let smtpTransport = mailer.createTransport({
            host: "smtp.yandex.ru",
            port: 465,
            auth: {
                user: "maximum@catlense.ru",
                pass: "Qpwoei@123456"
            }
        })

        let mail = {
            from: "maximum@catlense.ru",
            to: "max@voronin.xyz, oa1975@yandex.ru",
            subject: `Экспорт базы данных на ${new Date().getDay()}.${new Date().getMonth()}.${new Date().getFullYear()}`,
            text: `${new Date().getDay()}.${new Date().getMonth()}.${new Date().getFullYear()} ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
            html: "работает.",
            attachments: [
                {
                    file: "export.xlsx",
                    path: path.join(__dirname, 'exports', 'export-' + date + '.xlsx')
                }
            ]
        }

        smtpTransport.sendMail(mail, (err, res) => {
            if (err) { return console.log(err) }
            console.log(`Message send: ${res.message}`)

            smtpTransport.close()
        })
    }

}, 60000);

// Admin

app.get('/master/edit/:uid/:name/:photo', async (req, res) => {
    const master = await Master.findOne({ uid: +req.params.uid })

    master.name = req.params.name
    master.photo = '/img/' + req.params.photo

    await master.save()

    res.status(200).json({ response: master })
})

app.get('/master/delete/:uid', async (req, res) => {
    res.status(200).json({ response: await Master.deleteOne({ uid: req.params.uid }) })
})

app.get('/service/edit/:uid/:name/:price/:bonus', async (req, res) => {
    const service = await Service.findOne({ uid: req.params.uid })

    service.name = req.params.name
    service.price = req.params.price
    service.bonus = req.params.bonus

    await service.save()

    res.status(200).json({ response: service })
})

app.get('/service/delete/:uid', async (req, res) => {
    res.status(200).json({ response: await Service.deleteOne({ uid: req.params.uid }) })
})

app.get('/fixdb', async (req, res) => {
    const master = await Master.find({})
    const service = await Service.find({})
    const client = await Client.find({})
    const log = await Log.find({})

    master.forEach(async (m, i) => {
        m.uid = i + 1

        await m.save()
    })

    service.forEach(async (m, i) => {
        m.uid = i + 1

        await m.save()
    })

    client.forEach(async (m, i) => {
        m.uid = i + 1

        await m.save()
    })

    log.forEach(async (m, i) => {
        m.uid = i + 1

        await m.save()
    })

    res.status(200).json({ response: 'dbs fixed' })

})

app.get('/export', async (req, res) => {
    const fs = require('fs')
    const path = require('path')
    const json2csv = require('json2csv').parse

    const convertCsvToXlsx = require('@aternus/csv-to-xlsx');

    const log = await Log.find({})

    const date = new Date().toLocaleDateString().replace('.', '-').replace('.', '-') + '.' + new Date().toLocaleTimeString().replace(':', '-').replace(':', '-')

    const fields = [{
        label: 'Порядковый номер',
        value: 'uid'
    },
    {
        label: 'Дата',
        value: 'date'
    },
    {
        label: 'Время',
        value: 'time'
    },
    {
        label: 'Имя мастера',
        value: 'master'
    },
    {
        label: 'Имя клиента',
        value: 'client'
    },
    {
        label: 'Номер телефона',
        value: 'phone'
    },
    {
        label: 'Посещение',
        value: 'count'
    },
    {
        label: 'Услуги',
        value: 'service'
    },
    {
        label: 'Количество услуг',
        value: 'serviceCount'
    },
    {
        label: 'Стоимость услуг',
        value: 'servicePrice'
    }]

    let csv

    try {
        csv = json2csv(log, { fields }, { withBOM: true })
    } catch (err) {
        res.status(500).json({ err })
    }

    const filePath = path.join(__dirname, 'exports', 'export-' + date + '.csv')
    fs.writeFile(filePath, csv, (err) => {
        if (err) {
            return res.status(500).json({ err })
        } else {
            setTimeout(function () {
                fs.unlinkSync(filePath); // delete this file after 30 seconds
            }, 30000)
            let source = filePath
            let destination = path.join(__dirname, 'exports', 'export-' + date + '.xlsx')

            convertCsvToXlsx(source, destination)
            res.status(201).json({ filePath: path.join(__dirname, 'exports', 'export-' + date + '.xlsx') })
        }
    })

})


// Client module
app.get('/createClient/:phone/:name', async (req, res) => {
    const client = new Client({
        uid: await Client.count() + 1,
        name: req.params.name,
        phone: req.params.phone,
        count: 0
    })

    await client.save()

    res.status(201).json({ response: client })
})

app.get('/getClient/:phone', async (req, res) => {
    return res.status(200).json({ response: await Client.findOne({ phone: req.params.phone }) })
})

app.get('/exportFix', async(req, res) => {
    const log = await Log.find({})

    log.forEach(async (m, i) => {
        m.count = m.count + 1

        await m.save()
    })

    res.status(200).json("OK")
})

app.get('/addJoin/:phone/:master/:ids/:servicePrice', async (req, res) => {
    const client = await Client.findOne({ phone: req.params.phone })

    if (!client) { return res.status(404).json({ 'response': 'user not found' }) }

    if(new Date(client.lastJoin + 1 * 60000) <= Date.now()) {
        client.count += 1
        client.lastJoin = Date.now()
    }

    await client.save()

    let service = await Service.find({ uid: req.params.ids.toString().split(',') })
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
        count: client.count + 1,
        service: serviceName,
        servicePrice: req.params.servicePrice,
        serviceCount: service.length,
    })

    await log.save()

    res.status(200).json({ 'response': client })
})

app.get('/getSummary/:ids', async (req, res) => {
    const services = await Service.find({ uid: req.params.ids.toString().split(',') })
    let summary = 0

    services.forEach(element => summary += element.price)
    res.status(200).json({ response: summary })
})

// /service page functions

app.get('/getServices', async (req, res) => {
    return res.status(200).json({ response: await Service.find({}) })
})

app.get('/getService/:id', async (req, res) => {
    return res.status(200).json({ response: await Service.findOne({ uid: req.params.id }) })
})

app.get('/createService/:name/:price/:bonus', async (req, res) => {
    const service = await new Service({
        uid: await Service.count() + 1,
        name: req.params.name,
        price: req.params.price,
        bonus: req.params.bonus
    })

    await service.save()

    res.status(201).json({ response: service })
})


// /select page functions

app.get('/getMasters', async (req, res) => {
    return res.status(200).json({ response: await Master.find({}) })
})

app.get('/getMaster/:id', async (req, res) => {
    const master = await Master.findOne({ uid: req.params.id })
    res.status(200).json({ response: (master ? master : 'master not found') })
})

app.get('/createMaster/:name/:photo', async (req, res) => {
    // res.status(200).json({response: [req.params.name, req.params.photo]})
    const master = new Master({
        uid: await Master.count() + 1,
        name: req.params.name,
        photo: '/img/' + req.params.photo
    })

    await master.save()

    res.status(201).json({ response: master })
})

app.get('/img/:img', (req, res) => {
    res.sendFile(__dirname + '/img/' + req.params.img)
})

app.get('/', (req, res) => {
    res.status(200).json({ response: "OK" })
})

app.listen(config.PORT, () => console.log(`Server has been started on ${config.PORT} port...`))