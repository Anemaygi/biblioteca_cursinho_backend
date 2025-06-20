-- queries/emprestimosQueries.ts
import db from '../db'

export async function getEmprestimosComNomes() {
  const result = await db.query(`
    SELECT e.*, u.nome AS usuario_nome, l.titulo AS livro_titulo
    FROM emprestimo e
    JOIN usuario u ON e.usuario_id = u.id
    JOIN exemplar ex ON e.exemplar_codigo = ex.codigo
    JOIN livro l ON ex.livro_id = l.id
  `)
  return result.rows
}

export async function renovarEmprestimo(usuario_id: string, exemplar_codigo: string, data_inicio: string) {
  await db.query(
    `UPDATE emprestimo SET 
      data_fim_previsto = data_fim_previsto + INTERVAL '10 days',
      renovado = TRUE
     WHERE usuario_id = $1 AND exemplar_codigo = $2 AND data_inicio = $3`,
    [usuario_id, exemplar_codigo, data_inicio]
  )
}

export async function excluirEmprestimo(usuario_id: string, exemplar_codigo: string, data_inicio: string) {
  await db.query(
    `DELETE FROM emprestimo WHERE usuario_id = $1 AND exemplar_codigo = $2 AND data_inicio = $3`,
    [usuario_id, exemplar_codigo, data_inicio]
  )
}
