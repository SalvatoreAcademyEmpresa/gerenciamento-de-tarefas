const service = require("./tasks.service");
const { taskSchema } = require("./tasks.validation");

async function readAll(req, res) {
  const items = await service.readAll();
  res.send(items);
}

async function readById(req, res) {
  const id = req.params.id;
  const item = await service.readById(id);

  if (!item) {
    return res.status(404).send("Item não encontrado!");
  }

  res.send(item);
}

async function create(req, res) {
  /*const newItem = req.body;

  if (!newItem || !newItem.title) {
    return res.status(400).send("Não se esqueça do `title`!");
  }*/
  const { error, value } = taskSchema.validate(req.body);

  if (error) {
    return res.status(400).send(error.details.map(detail => detail.message).join(", "));
  }

  await service.create(value);
  res.status(201).send(value);

  /*await service.create(newItem);
  res.status(201).send(newItem);*/
}

async function updateById(req, res) {
  const id = req.params.id;
  const { error, value } = taskSchema.validate(req.body);

  if(error){
    return res.status(400).send(error.details.map(detail => detail.message).join(", "));
  }

  const updatedItem = await service.updateById(id, value);

  if(!updatedItem){
    return res.status(404).send("Item não encontrado para atualização");
  }
  res.send(updatedItem)
  
  /*const newItem = req.body;

  if (!newItem || !newItem.title) {
    return res.status(400).send("Não se esqueça do `nome`!");
  }

  await service.updateById(id, newItem);

  res.send(newItem);*/
}

async function deleteById(req, res) {
  const id = req.params.id;
  const result = await service.deleteById(id);

  //await service.deleteById(id);

  if(!result){
    return res.status(404).send("Item não encontrado para exclusão!");
  }

  res.send("Item removido com sucesso! " + id);
}

module.exports = {
  readAll,
  readById,
  create,
  updateById,
  deleteById,
};
