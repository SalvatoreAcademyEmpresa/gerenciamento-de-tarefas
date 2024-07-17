const { ObjectId } = require('mongodb')
const { getDatabase } = require('../db/database-connection')

function getCollection() {
    return getDatabase().collection('tarefas')
}

function readAll() {
    return getCollection().find().toArray()
}

/**
 * @param {string} id
 * @returns
 */

function readById(id){
    return getCollection().findOne({ _id: new ObjectId(id)})
}

function create(newItem){
    return getCollection().insertOne(newItem)
}

/**
 * @param {string} id
 * @returns
 */

function updateById(id, newItem) {
    return getCollection().updateOne(
        { _id: new ObjectId(id) },
        { $set: newItem }
    )
}

/**
 * @param {string} id
 * @returns
 */

function deleteById(id){
    return getCollection().deleteOne({ _id: new ObjectId(id) })
}

module.exports = {
    readAll,
    readById,
    create,
    updateById,
    deleteById
}