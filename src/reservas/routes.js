const { Router } = require('express');
const controller = require('./controller');

const router = Router();

router.post('/', controller.createReserva);
router.get('/', controller.getAllReservas);
router.get('/livros-disponiveis', controller.getLivrosComReservasEDisponiveis);
router.get('/livro/:livroId', controller.getReservasPorLivroId);

module.exports = router;
