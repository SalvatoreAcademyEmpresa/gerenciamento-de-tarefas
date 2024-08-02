const Task = require('../db/task.model')
//const { ObjectId } = require('mongodb')
//const { getDatabase } = require('../db/database-connection')

/*function getCollection() {
    return getDatabase().collection('tarefas')
}*/

function readAll() {
    //return getCollection().find().toArray()
    return Task.find.exec();
}

/**
 * @param {string} id
 * @returns
 */

function readById(id){
    //return getCollection().findOne({ _id: new ObjectId(id)})
    return Task.findById(id).exec();
}

function create(newItem){
    //return getCollection().insertOne(newItem)
    const task = new Task(newItem)
    return task.save();
}

/**
 * @param {string} id
 * @returns
 */

function updateById(id, newItem) {
    newItem.updatedAt = Date.now()
    return Task.findByIdAndUpdate(id, newItem, {new: true}).exec();

    /*return getCollection().updateOne(
        { _id: new ObjectId(id) },
        { $set: newItem }
    )*/
}

/**
 * @param {string} id
 * @returns
 */

function deleteById(id){
    //return getCollection().deleteOne({ _id: new ObjectId(id) })
    return Task.findByIdAndDelete(id).exec();
}

module.exports = {
    readAll,
    readById,
    create,
    updateById,
    deleteById
}