const { string, required } = require('joi');
const mongoose = require('mongoose');

const lembreteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'O título é obrigatório'],
        trim: true,
        minlength: [3, 'O título precisa ter pelo menos 3 caracteres']
    },
    description: {
        type: String,
        required: [true, 'A descrição é obrigatória'],
        trim: true
    },
    date: {
        type: Date,
        required: [true, 'A data é obrigatória'],
        default: Date.now
    },
    completed: {
        type: Boolean,
        default: false
    }
})

const Lembrete = mongoose.model('Lembrete', lembreteSchema);

module.exports = Lembrete;