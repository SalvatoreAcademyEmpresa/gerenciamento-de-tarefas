const Joi = require("joi");

const taskSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
});

const taskOrderSchema = Joi.array().items(
  Joi.object({
    id: Joi.string().required(),
    order: Joi.number().required(),
  })
);

module.exports = {
  taskSchema,
  taskOrderSchema,
};
