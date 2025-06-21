const pool = require('../config/db');
const queries = require('./queries');
const { formatarPenalidade } = require('./utils');

const getTipos = async (req, res) => {
  try {
    const result = await pool.query("SELECT id, nome FROM penalidade_tipo ORDER BY nome");
    res.json(result.rows);
  } catch (err) {
    console.error("Erro ao buscar tipos:", err);
    res.status(500).send("Erro ao buscar tipos");
  }
};

const getCausas = async (req, res) => {
  try {
    const result = await pool.query("SELECT id, nome FROM penalidade_causa ORDER BY nome");
    res.json(result.rows);
  } catch (err) {
    console.error("Erro ao buscar causas:", err);
    res.status(500).send("Erro ao buscar causas");
  }
};

const getAll = async (req, res) => {
  try {
    const result = await pool.query(queries.getAll);
    res.json(result.rows.map(formatarPenalidade));
  } catch (err) {
    console.error("Erro ao buscar penalidades:", err);
    res.status(500).send("Erro ao buscar penalidades");
  }
};

const addPenalidade = async (req, res) => {
  const { usuario_id, exemplar_codigo, emprestimo_data_inicio, tipo_id, causa_id, data_aplicacao, data_suspensao } = req.body;
  try {
    const result = await pool.query(queries.insert, [
      usuario_id,
      exemplar_codigo,
      emprestimo_data_inicio,
      data_aplicacao,
      data_suspensao || null,
      tipo_id,
      causa_id
    ]);
    res.status(201).json(formatarPenalidade(result.rows[0]));
  } catch (err) {
    console.error("Erro ao adicionar penalidade:", err);
    res.status(500).send("Erro ao adicionar penalidade");
  }
};

const editPenalidade = async (req, res) => {
  const { usuario_id, exemplar_codigo, emprestimo_data_inicio, data_aplicacao } = req.params;
  const { tipo_id, causa_id, data_suspensao, status_cumprida } = req.body;

  try {
    const result = await pool.query(queries.update, [
      tipo_id,
      causa_id,
      data_suspensao,
      status_cumprida ? 'Cumprida' : 'Pendente',
      usuario_id,
      exemplar_codigo,
      emprestimo_data_inicio,
      data_aplicacao,
    ]);
    if (result.rowCount === 0) return res.status(404).send("Penalidade não encontrada");
    res.json(formatarPenalidade(result.rows[0]));
  } catch (err) {
    console.error("Erro ao editar penalidade:", err);
    res.status(500).send("Erro ao editar penalidade");
  }
};

const removePenalidade = async (req, res) => {
  const { usuario_id, exemplar_codigo, emprestimo_data_inicio, data_aplicacao } = req.params;
  try {
    const result = await pool.query(queries.remove, [
      usuario_id,
      exemplar_codigo,
      emprestimo_data_inicio,
      data_aplicacao,
    ]);
    if (result.rowCount === 0) return res.status(404).send("Penalidade não encontrada");
    res.send("Penalidade removida com sucesso");
  } catch (err) {
    console.error("Erro ao remover penalidade:", err);
    res.status(500).send("Erro ao remover penalidade");
  }
};

const marcarCumprida = async (req, res) => {
  const { usuario_id, exemplar_codigo, emprestimo_data_inicio, data_aplicacao } = req.params;
  const hoje = new Date().toISOString().split('T')[0]; // Data atual no formato YYYY-MM-DD

  try {
    const result = await pool.query(`
      UPDATE penalidade
      SET status_cumprida = TRUE,
          "data_suspensao" = CASE
            WHEN "data_suspensao" IS NULL THEN $5  -- Preencher data_suspensao se estiver NULL
            ELSE "data_suspensao"  -- Caso contrário, não mexer
          END
      WHERE "usuario_id" = $1 AND "exemplar_codigo" = $2 
        AND "emprestimo_data_inicio" = $3 AND "data_aplicacao" = $4
      RETURNING *;
    `, [usuario_id, exemplar_codigo, emprestimo_data_inicio, data_aplicacao, hoje]);

    if (result.rowCount === 0) return res.status(404).send("Penalidade não encontrada");
    res.json(formatarPenalidade(result.rows[0]));
  } catch (err) {
    console.error("Erro ao marcar penalidade como cumprida:", err);
    res.status(500).send("Erro ao atualizar penalidade");
  }
};

const getByUsuario = async (req, res) => {
  const { usuario_id } = req.params;
  try {
    const result = await pool.query(queries.getByUsuario, [usuario_id]);
    res.json(result.rows.map(formatarPenalidade));
  } catch (err) {
    console.error("Erro ao buscar penalidades por usuário:", err);
    res.status(500).send("Erro ao buscar penalidades");
  }
};

module.exports = {
  getAll,
  addPenalidade,
  editPenalidade,
  removePenalidade,
  marcarCumprida,
  getByUsuario,
  getTipos,
  getCausas,
};
