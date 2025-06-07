const {Router} = require('express');
const controller = require('./controller');
const express = require('express');
const app = express();

app.use(express.json());

const router = Router();

router.get('/', controller.getAll);
router.get('/atrasados', controller.getAtrasados);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.remove);


module.exports = router;