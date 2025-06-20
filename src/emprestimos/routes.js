// routes/emprestimosRoutes.ts
import { Router } from 'express'
import * as emprestimosController from '../controllers/emprestimosController'

const router = Router()

router.get('/emprestimos', emprestimosController.listarEmprestimos)
router.patch('/emprestimos/:usuario_id/:exemplar_codigo/:data_inicio/renovar', emprestimosController.renovarEmprestimo)
router.delete('/emprestimos/:usuario_id/:exemplar_codigo/:data_inicio', emprestimosController.excluirEmprestimo)

export default router
