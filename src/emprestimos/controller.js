// controllers/emprestimosController.ts
import { Request, Response } from 'express'
import * as emprestimosQueries from '../queries/emprestimosQueries'

export async function listarEmprestimos(req: Request, res: Response) {
  try {
    const emprestimos = await emprestimosQueries.getEmprestimosComNomes()
    res.json(emprestimos)
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar empréstimos' })
  }
}

export async function renovarEmprestimo(req: Request, res: Response) {
  const { usuario_id, exemplar_codigo, data_inicio } = req.params

  try {
    await emprestimosQueries.renovarEmprestimo(usuario_id, exemplar_codigo, data_inicio)
    res.sendStatus(204)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Erro ao renovar empréstimo' })
  }
}

export async function excluirEmprestimo(req: Request, res: Response) {
  const { usuario_id, exemplar_codigo, data_inicio } = req.params

  try {
    await emprestimosQueries.excluirEmprestimo(usuario_id, exemplar_codigo, data_inicio)
    res.sendStatus(204)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Erro ao excluir empréstimo' })
  }
}
