const {Router} = require('express');
const controller = require('./controller');

const router = Router();

router.get('/', controller.getAll);
router.post('/', controller.addLivro);

module.exports = router;