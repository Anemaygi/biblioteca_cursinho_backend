// routes.js

const { Router } = require('express');
const controller = require('./controller');
const express = require('express');
const app = express();

app.use(express.json());

const router = Router();

router.get('/', controller.getAll);
router.get('/atrasados', controller.getAtrasados);
router.get('/:id', controller.getById);
router.post('/', controller.create);
router.post('/batch', controller.createBatch); // A rota agora chama a função no controller
router.put('/:id', controller.update);
router.delete('/:id', controller.remove);

module.exports = router;