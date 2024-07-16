require('dotenv').config()
const express = require('express')
const { connectToDatabase } = require('./db/database-connection')

async function main() {

    const db = client.db(dbName)
    const collection = db.collection('tarefas')

    const app = express()
    app.use(express.json())

    app.get('/tarefas', async function (req, res) {
        const itens = await collection.find().toArray()
        res.send(itens)
    })

    app.listen(3000, function() {
        console.log("Servidor rodando!")
    })
}

main()