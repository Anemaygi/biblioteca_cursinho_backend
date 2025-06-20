const { Router } = require('express');
const controller = require('./controller');

const router = Router();

router.get('/', controller.getAll);

// DELETE: /emprestimos/:usuario_id/:exemplar_codigo/:data_inicio
router.delete('/:usuario_id/:exemplar_codigo/:data_inicio', controller.deleteEmprestimo);

// PATCH: /emprestimos/:usuario_id/:exemplar_codigo/:data_inicio/renovar
router.patch('/:usuario_id/:exemplar_codigo/:data_inicio/renovar', controller.renovarEmprestimo);

module.exports = router;
