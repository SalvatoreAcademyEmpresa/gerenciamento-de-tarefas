const express = require('express')
const { MongoClient } = require('mongodb')


const dbUrl = 'mongodb+srv://admin:AlanFabsEstudoSalvatore24@cluster0.hmmuzy9.mongodb.net'
const dbName = 'mongo_todo_list'

async function main() {

    const Client = new MongoClient(dbUrl)
    console.log("Conectando ao banco de dados")
    await Client.connect()
    console.log("Banco de dados conectado com sucesso!")

    const db = Client.db(dbName)
    const collection = db.collection('tarefas')

    const app = express()

    app.get('/', function (req, res) {
        res.send('Hello World')
    })

    app.listen(3000)
}

main()