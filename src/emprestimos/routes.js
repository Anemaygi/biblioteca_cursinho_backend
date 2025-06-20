const { Router } = require('express')
const controller = require('./controller')

const router = Router()

router.get('/', controller.getAll)
router.get('/buscar', controller.search)
router.post('/', controller.add)
router.delete('/:usuario_id/:exemplar_codigo/:data_inicio', controller.remove)
router.patch('/:usuario_id/:exemplar_codigo/:data_inicio/renovar', controller.renovar)
router.put('/:usuario_id/:exemplar_codigo/:data_inicio', controller.edit)

module.exports = router
