const {Router} = require('express');
const controller = require('./controller');

const router = Router();

router.delete('/:codigo', controller.removeExemplar);
router.post("/adicionar", controller.addExemplar);

module.exports = router;