const { Router } = require('express');
const controller = require('./controller');

const router = Router();

router.get('/', controller.getAll);
router.post('/', controller.addPenalidade);
router.get('/usuario/:usuario_id', controller.getByUsuario);
router.put('/:usuario_id/:exemplar_codigo/:emprestimo_data_inicio/:data_aplicacao', controller.editPenalidade);
router.delete('/:usuario_id/:exemplar_codigo/:emprestimo_data_inicio/:data_aplicacao', controller.removePenalidade);
router.patch('/:usuario_id/:exemplar_codigo/:emprestimo_data_inicio/:data_aplicacao/cumprida', controller.marcarCumprida);
router.get('/tipos', controller.getTipos);
router.get('/causas', controller.getCausas);

module.exports = router;
