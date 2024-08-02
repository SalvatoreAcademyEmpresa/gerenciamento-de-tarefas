const mongoose = require('mongoose');
//const { MongoClient } = require('mongodb')

const dbUrl = process.env.DATABASE_mongo
//const dbName = 'mongo_todo_list'
//const client = new MongoClient(dbUrl)

async function connectToDatabase(){
    console.log("Conectando ao banco de dados")
    await mongoose.connect(dbUrl, {useNewUrlParser: true, useUnifiedTopology: true})
    //await client.connect()
    console.log("Banco de dados conectado com sucesso!")
}

function getDatabase(){
    //return client.db(dbName)
    return mongoose.connection
}

module.exports = {
    connectToDatabase,
    getDatabase
}