const express = require('express')
const bodyParser = require("body-parser");

const app = express()
const port = process.env.PORT || 3000
const preguntados = require("./preguntados.json")
const moment = require("moment")
const { Client } = require('pg');

// const client = new Client({
//     connectionString: process.env.DATABASE_URL,
//     ssl: {
//         rejectUnauthorized: false
//     }
// });
// client.connect()

app.use(express.json());

app.get('/bot', (req, res) => {
    const question = req.query["q"];
    const review = req.query["value"]
    
    console.log(question, review)
    res.json(preguntados[question])
})

app.post('/bot', (req, res) => {
    
    const text = 'INSERT INTO rsvp(name, adultos, ninios, transporte, alimentos) VALUES($1, $2, $3, $4, $5) RETURNING *'
    const object = req.body
    if (!object) {
        res.status(400)
            .send("Faltan parametros")
    }
    const values = [
        object.name, parseInt(object.adultos), parseInt(object.ninios), object.transporte, object.alimentos
    ]
    client
        .query(text, values)
        .then(result => {
            console.log(result.rows[0])
            res.json(preguntados["finishing"])
        })
        .catch(e => {
            res.status(500).send( "Lo siento no puedo agendarte, puedes intentar nuevamente")
            console.error(e.stack)
        })
        
})
app.use('/', express.static('public'))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})