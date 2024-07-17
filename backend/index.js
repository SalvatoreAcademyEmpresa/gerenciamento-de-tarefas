require('dotenv').config()
const express = require('express')
const { connectToDatabase } = require('./db/database-connection')

const tarefasRouter = require('./tarefas/tarefas.router')

async function main() {
    
    await connectToDatabase()
    const app = express()

    app.use(express.json())

    app.get('/', function (req, res) {
        res.send('Hello World!')
    })

    app.use('/tarefas', tarefasRouter)
    
    app.listen(3000, function() {
        console.log("Servidor rodando!")
    })
}

// Código organizado com MVC

main()