const { Router } = require('express');
const controller = require('./controller');

const router = Router();

router.get('/', controller.getAll); // Obter todos os empréstimos
router.post('/', controller.adicionarEmprestimo); // Adicionar um empréstimo
router.delete('/:usuario_id/:exemplar_codigo/:data_inicio', controller.deleteEmprestimo); // Excluir um empréstimo
router.patch('/:usuario_id/:exemplar_codigo/:data_inicio/renovar', controller.renovarEmprestimo); // Renovar um empréstimo
router.patch('/:usuario_id/:exemplar_codigo/:data_inicio/devolver', controller.marcarComoDevolvido); // Marcar como devolvido

module.exports = router;
