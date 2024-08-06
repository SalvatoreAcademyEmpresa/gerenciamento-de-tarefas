const mongoose = require('mongoose');

const dbUrl = process.env.DATABASE_mongo;

async function connectToDatabase() {
    try {
        console.log("Conectando ao banco de dados");
        await mongoose.connect(dbUrl, {
            // Opções deprecated removidas
        });
        console.log("Banco de dados conectado com sucesso!");
    } catch (error) {
        console.error("Erro ao conectar ao banco de dados:", error);
        throw error; // Lança o erro para que possa ser tratado fora da função
    }
}

function getDatabase() {
    return mongoose.connection;
}

module.exports = {
    connectToDatabase,
    getDatabase
};
