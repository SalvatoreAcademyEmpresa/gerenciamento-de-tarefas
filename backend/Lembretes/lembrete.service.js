const Lembrete = require('./lembrete.model');

const createLembrete = async (data) =>{
    const lembrete = new Lembrete(data);
    return await lembrete.save();
};

const getAllLembretes = async() => {
    return await Lembrete.find();
};

const updateLembrete = async(id, data) => {
    return await Lembrete.findByIdAndUpdate(id, data, {new: true});
};

const deleteLembrete = async(id) => {
    return await Lembrete.findByIdAndDelete(id);
};

module.exports = {
    createLembrete,
    getAllLembretes,
    updateLembrete,
    deleteLembrete
};