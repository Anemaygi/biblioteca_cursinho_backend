const {Router} = require('express');
const controller = require('./controller');

const router = Router();

router.get('/', controller.getAll);
router.get('/atrasados', controller.getAtrasados);

module.exports = router;