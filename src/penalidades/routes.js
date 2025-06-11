const { Router } = require('express');
const controller = require('./controller');

const router = Router();

router.get('/', controller.getAll);
router.post('/', controller.addPenalidade);
router.put('/:id', controller.editPenalidade);
router.delete('/:id', controller.removePenalidade);
router.patch('/:id/cumprida', controller.marcarCumprida);
router.get('/usuario/:usuario_id', controller.getByUsuario);

module.exports = router;
