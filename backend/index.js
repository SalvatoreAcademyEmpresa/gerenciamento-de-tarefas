const express = require('express')
const { MongoClient } = require('mongodb')


const dbUrl = 'mongodb+srv://admin:AlanFabsEstudoSalvatore24@cluster0.hmmuzy9.mongodb.net'
const dbName = 'mongo_todo_list'

async function main() {

    const client = new MongoClient(dbUrl)
    console.log("Conectando ao banco de dados")
    await client.connect()
    console.log("Banco de dados conectado com sucesso!")

    const db = client.db(dbName)
    const collection = db.collection('tarefas')

    const app = express()

    app.get('/tarefas', async function (req, res) {
        const itens = await collection.find().toArray()
        res.send(itens)
    })

    app.listen(3000)
}

main()