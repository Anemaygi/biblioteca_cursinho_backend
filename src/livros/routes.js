const {Router} = require('express');
const controller = require('./controller');

const router = Router();

router.get('/', controller.getAll);
router.post('/', controller.addLivro);
router.put('/:id', controller.editLivro);
router.delete('/:id', controller.removeLivro);
router.post('/autor', controller.adicionarAutorAoLivro); 
router.get('/isbn/:isbn', controller.getByIsbnCompleto);


module.exports = router;