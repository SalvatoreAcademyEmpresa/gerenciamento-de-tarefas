const Task = require("./tasks.model");

function readAll() {
  // Retorna todas as tarefas
  return Task.find();
}

/**
 * @param {string} id
 * @returns
 */
function readById(id) {
  // Retorna uma tarefa pelo ID
  return Task.findById(id);
}

function create(newItem) {
  // Cria uma nova tarefa e a salva
  const task = new Task(newItem);
  return task.save();
}

/**
 * @param {string} id
 * @param {Object} newItem
 * @returns
 */
function updateById(id, newItem) {
  newItem.updatedAt = Date.now();
  // Atualiza uma tarefa pelo ID e retorna o documento atualizado
  return Task.findByIdAndUpdate(id, newItem, { new: true });
}

/**
 * @param {string} id
 * @returns
 */
function deleteById(id) {
  // Deleta uma tarefa pelo ID
  return Task.findByIdAndDelete(id);
}

module.exports = {
  readAll,
  readById,
  create,
  updateById,
  deleteById,
};