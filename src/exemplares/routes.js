const {Router} = require('express');
const controller = require('./controller');

const router = Router();

router.delete('/:codigo', controller.removeExemplar);

module.exports = router;