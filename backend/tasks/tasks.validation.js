const Joi = require("joi");

const taskSchema = Joi.object({
    title: Joi.string().min(3).required().messages({
        'string.base': 'O título deve ser uma string.',
        'string.empty': 'O título não pode estar vazio.',
        'string.min': 'O título deve ter pelo menos 3 caracteres.',
        'any.required': 'O título é obrigatório.',
    }),
    description: Joi.string().optional(),
});

module.exports = {
    taskSchema
};