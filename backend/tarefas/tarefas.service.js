const Task = require('../db/task.model');

function readAll() {
    // Retorna todas as tarefas
    return Task.find(); // Removido o `.exec()`, pois `find()` já retorna uma Promise
}

/**
 * @param {string} id
 * @returns
 */
function readById(id){
    // Retorna uma tarefa pelo ID
    return Task.findById(id); // Removido o `.exec()`, pois `findById()` já retorna uma Promise
}

function create(newItem){
    // Cria uma nova tarefa e a salva
    const task = new Task(newItem);
    return task.save(); // `save()` já retorna uma Promise
}

/**
 * @param {string} id
 * @param {Object} newItem
 * @returns
 */
function updateById(id, newItem) {
    newItem.updatedAt = Date.now();
    // Atualiza uma tarefa pelo ID e retorna o documento atualizado
    return Task.findByIdAndUpdate(id, newItem, { new: true }); // Removido o `.exec()`, pois `findByIdAndUpdate()` já retorna uma Promise
}

/**
 * @param {string} id
 * @returns
 */
function deleteById(id){
    // Deleta uma tarefa pelo ID
    return Task.findByIdAndDelete(id); // Removido o `.exec()`, pois `findByIdAndDelete()` já retorna uma Promise
}

module.exports = {
    readAll,
    readById,
    create,
    updateById,
    deleteById
};
