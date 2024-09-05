const Joi = require("joi");

const createTaskSchema = Joi.object({
    title: Joi.string().min(3).required().messages({
        'string.empty': 'O título não pode estar vazio.',
        'string.min': 'O título deve ter pelo menos 3 caracteres.',
        'any.required': 'O título é obrigatório.!',
        'string.base': 'O título deve ser uma string!!!'
    }),
    description: Joi.string().required().messages({
        'string.empty': 'Não se esqueça da description!',
        'any.required': 'A description é obrigatória.'
    })
});

const updateTaskSchema = Joi.object({
    title: Joi.string().min(3).required().messages({
        'string.empty': 'O título não pode estar vazio.',
        'string.min': 'O título deve ter pelo menos 3 caracteres.',
        'any.required': 'O título é obrigatório.',
        'string.base': 'O título deve ser uma string.'
    }),
    description: Joi.string().required().messages({
        'string.empty': 'Não se esqueça da description!',
        'any.required': 'A description é obrigatória.'
    })
});

const validateCreateTask = (req, res, next) => {
    const { error } = createTaskSchema.validate(req.body);
    if(error){
        return res.status(400).json({ error: error.details.map(err => err.message).join(", ") });
    }
    next();
};

const validateUpdateTask = (req, res, next) => {
    const { error } = updateTaskSchema.validate(req.body);
    if(error){
        return res.status(400).json({ error: error.details.map(err => err.message).join(", ") });
    }
    next();
};

module.exports = {
    validateCreateTask,
    validateUpdateTask,
    createTaskSchema,
    updateTaskSchema
};