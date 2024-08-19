const express = require("express");
const controller = require("./tasks.controller");
const { validateCreateTask, validateUpdateTask  } = require("./tasks.validation");

const router = express.Router();

router.get("/", controller.readAll);
router.get("/:id", controller.readById);
router.post("/", validateCreateTask, controller.create);
router.put("/:id", validateUpdateTask, controller.updateById);
router.delete("/:id", controller.deleteById);

module.exports = router;