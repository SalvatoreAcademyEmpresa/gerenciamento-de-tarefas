const express = require('express')

const dbUrl = 'mongodb+srv://admin:AlanFabsEstudoSalvatore24@cluster0.hmmuzy9.mongodb.net'
const dbName = 'mongo_todo_list'

const app = express()

app.get('/', function (req, res) {
    res.send('Hello World')
})

app.listen(3000)