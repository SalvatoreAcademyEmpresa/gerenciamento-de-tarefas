const Task = require("./tasks.model");

async function updateTaskOrder(taskUpdates) {
  const updates = taskUpdates.map((update) => ({
    updateOne: {
      filter: { _id: update.id },
      update: { $set: { order: update.order } },
    },
  }));

  await Task.bulkWrite(updates);
  // Retorna as tarefas atualizadas e ordenadas
  return Task.find().sort({ order: 1 });
}

function readAll() {
  // Retorna todas as tarefas ordenadas pelo campo 'order'
  return Task.find().sort({ order: 1 });
}

/**
 * @param {string} id
 * @returns
 */
function readById(id) {
  // Retorna uma tarefa pelo ID
  return Task.findById(id);
}

async function create(newItem) {
  // Encontra a maior ordem atual
  const maxOrderTask = await Task.findOne().sort({ order: -1 });
  const nextOrder = maxOrderTask ? maxOrderTask.order + 1 : 0;

  // Cria uma nova tarefa com a próxima ordem
  const task = new Task({
    ...newItem,
    order: nextOrder,
  });
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
  updateTaskOrder,
};
