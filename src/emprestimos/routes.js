const { Router } = require('express');
const controller = require('./controller');

const router = Router();

router.get('/', controller.getAll);

// DELETE com parâmetros na URL
router.delete('/:usuario_id/:exemplar_codigo/:data_inicio', controller.deleteEmprestimo);

// PATCH para renovação
router.patch('/:usuario_id/:exemplar_codigo/:data_inicio/renovar', controller.renovarEmprestimo);

module.exports = router;
