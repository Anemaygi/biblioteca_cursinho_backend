const { Router } = require('express');
const controller = require('./controller');

const router = Router();

router.get('/', controller.getAll);
router.post('/', controller.adicionarEmprestimo);
router.delete('/:usuario_id/:exemplar_codigo/:data_inicio', controller.deleteEmprestimo);
router.patch('/:usuario_id/:exemplar_codigo/:data_inicio/renovar', controller.renovarEmprestimo);

module.exports = router;
