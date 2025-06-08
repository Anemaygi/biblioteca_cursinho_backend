const { Router } = require('express');
const controller = require('./controller');

const router = Router();

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', controller.addAutor);
router.put('/:id', controller.updateAutor);
router.delete('/:id', controller.removeAutor);

module.exports = router;
