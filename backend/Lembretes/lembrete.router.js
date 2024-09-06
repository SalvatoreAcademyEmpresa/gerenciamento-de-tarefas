const express = require('express');
const router = express.Router();
const lembreteController = require('./lembrete.controller');

router.post('/', lembreteController.createLembrete);
router.get('/', lembreteController.getAllLembretes);
router.put('/:id', lembreteController.updateLembrete);
router.delete('/:id', lembreteController.deleteLembrete);

module.exports = router;