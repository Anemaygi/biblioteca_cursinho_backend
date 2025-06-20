const { Router } = require('express');
const controller = require('./controller');

const router = Router();

router.get('/', controller.getAll);
router.delete('/deletar', controller.deleteEmprestimo);
router.put('/renovar', controller.renovarEmprestimo);

module.exports = router;
