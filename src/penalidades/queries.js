const db = require('../db') // seu cliente do banco (ex: pg Pool)

async function listarPenalidades() {
  return db.query('SELECT * FROM penalidades')
}

async function criarPenalidade(penalidade) {
  const {
    usuario_id,
    exemplar_codigo,
    emprestimo_data_inicio,
    data_aplicacao,
    tipo_id,
    causa_id,
    status_cumprida
  } = penalidade

  const res = await db.query(
    `INSERT INTO penalidades
    (usuario_id, exemplar_codigo, emprestimo_data_inicio, data_aplicacao, tipo_id, causa_id, status_cumprida)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *`,
    [usuario_id, exemplar_codigo, emprestimo_data_inicio, data_aplicacao, tipo_id, causa_id, status_cumprida]
  )

  return res.rows[0]
}

async function atualizarPenalidade(usuario_id, exemplar_codigo, emprestimo_data_inicio, data_aplicacao, dados) {
  const { status_cumprida } = dados

  const res = await db.query(
    `UPDATE penalidades SET status_cumprida = $1
    WHERE usuario_id = $2 AND exemplar_codigo = $3 AND emprestimo_data_inicio = $4 AND data_aplicacao = $5
    RETURNING *`,
    [status_cumprida, usuario_id, exemplar_codigo, emprestimo_data_inicio, data_aplicacao]
  )

  return res.rows[0]
}

async function removerPenalidade(usuario_id, exemplar_codigo, emprestimo_data_inicio, data_aplicacao) {
  return db.query(
    `DELETE FROM penalidades
    WHERE usuario_id = $1 AND exemplar_codigo = $2 AND emprestimo_data_inicio = $3 AND data_aplicacao = $4`,
    [usuario_id, exemplar_codigo, emprestimo_data_inicio, data_aplicacao]
  )
}

async function listarUsuarios() {
  return db.query('SELECT id, nome, cpf FROM usuarios')
}

async function listarTiposPenalidade() {
  return db.query('SELECT id, nome FROM penalidade_tipo')
}

async function listarCausasPenalidade() {
  return db.query('SELECT id, nome FROM penalidade_causa')
}

async function listarEmprestimosUsuario(usuario_id) {
  return db.query(
    `SELECT exemplar_codigo, data_inicio FROM emprestimos
    WHERE usuario_id = $1 AND ativo = true`,
    [usuario_id]
  )
}

async function inativarExemplar(exemplar_codigo) {
  return db.query(
    `UPDATE exemplares SET ativo = false WHERE codigo = $1`,
    [exemplar_codigo]
  )
}

module.exports = {
  listarPenalidades,
  criarPenalidade,
  atualizarPenalidade,
  removerPenalidade,
  listarUsuarios,
  listarTiposPenalidade,
  listarCausasPenalidade,
  listarEmprestimosUsuario,
  inativarExemplar,
}
