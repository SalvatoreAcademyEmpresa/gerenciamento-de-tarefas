const express = require("express");
const controller = require("./tasks.controller");
const { validateTask, validateTaskOrder } = require("../validationMiddleware");

const router = express.Router();

router.get("/", controller.readAll);
router.get("/:id", controller.readById);
router.post("/", validateTask, controller.create);
router.put("/:id", validateTask, controller.updateById);
router.delete("/:id", controller.deleteById);
router.put("/order", validateTaskOrder, controller.updateTaskOrder);

module.exports = router;