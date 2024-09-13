const Lembrete = require('./lembrete.model');

const createLembrete = async (req, res) => {
    try {
        const savedLembrete = await lembreteService.createLembrete(req, body);
        res.status(201).json(savedLembrete);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getAllLembretes = async (req, res) => {
    try {
        const lembretes = await lembreteService.getAllLembretes();
        res.status(200).json(lembretes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateLembrete = async (req, res) => {
    try {
        const updatedLembrete = await lembreteService.updateLembrete(req.params.id, req.body);
        if (!updatedLembrete) return res.status(404).json({ message: 'Lembrete não encontrado' });
        res.status(200).json(updatedLembrete);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteLembrete = async (req, res) => {
    try {
        const deletedLembrete = await lembreteService.deleteLembrete(req.params.id);
        if (!deletedLembrete) return res.status(404).json({ message: 'Lembrete não encontrado!' });
        res.status(200).json({ message: 'Lembrete deletado com sucesso ' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createLembrete,
    getAllLembretes,
    updateLembrete,
    deleteLembrete
};