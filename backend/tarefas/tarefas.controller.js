const service = require('./tarefas.service')

async function readAll(req, res) {
    const items = await service.readAll()
    res.send(items)
}

async function readById(req, res) {
    const id = req.params.id
    const item = await service.readById(id)
    if (!item){
        return res.status(404).send('Item não encontrado!')
    }
    res.send(item)
}

async function create(req, res){
    const newItem = req.body

    if(!newItem || !newItem.text) {
        return res.status(400).send('Não se esqueça do `nome`!')
    }
    await service.create(newItem)
    res.status(201).send(newItem)
}

async function updateById(req, res){
    const id = req.params.id
    const newItem = req.body

    if(!newItem || !newItem.text){
        return res.status(400).send('Não se esqueça do `nome`!')
    }
    await service.updateById(id, newItem)
    res.send(newItem)
}

async function deleteById(req, res){
    const id = req.params.id
    await service.deleteById(id)
    res.send('Item removido com sucesso! ' + id)
}

module.exports = {
    readAll,
    readById,
    create,
    updateById,
    deleteById
}