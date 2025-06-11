const express = require('express')
const controller = require('./controller')

const router = express.Router()

router.get('/penalidades', controller.getPenalidades)
router.post('/penalidades', controller.postPenalidade)
router.patch('/penalidades/:usuario_id/:exemplar_codigo/:emprestimo_data_inicio/:data_aplicacao', controller.patchPenalidade)
router.delete('/penalidades/:usuario_id/:exemplar_codigo/:emprestimo_data_inicio/:data_aplicacao', controller.deletePenalidade)

router.get('/usuarios', controller.getUsuarios)
router.get('/penalidade_tipo', controller.getTipos)
router.get('/penalidade_causa', controller.getCausas)

router.get('/emprestimos/usuario/:usuario_id', controller.getEmprestimosUsuario)

router.patch('/exemplares/:exemplar_codigo/inativar', controller.patchInativarExemplar)

module.exports = router
