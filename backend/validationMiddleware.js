const { taskSchema } = require('./validation');

function validateTask(req, res, next){
    const { error } = taskSchema.validate(req.body);
    if(error){
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
}

module.exports = {
    validateTask
};