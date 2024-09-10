const Joi = require('joi');
const { taskSchema } = require('./validation');

const taskOrderSchema = Joi.array().items(
    Joi.object({
        id: Joi.string().required(),
        order: Joi.number().required()
    })
);

function validateTask(req, res, next){
    const { error } = taskSchema.validate(req.body);
    if(error){
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
}

function validateTaskOrder(req, res, next){
    const { error } = taskOrderSchema.validate(req.body);
    if(error){
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
}

module.exports = {
    validateTask,
    validateTaskOrder 
};