const pool = require('../config/db');
const queries = require('./queries');
const { formatarPenalidade } = require('./utils');

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
      tipo_id,
      causa_id,
      data_aplicacao,
      data_suspensao,
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
      status_cumprida,
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
  try {
    const result = await pool.query(queries.markCumprida, [
      usuario_id,
      exemplar_codigo,
      emprestimo_data_inicio,
      data_aplicacao,
    ]);
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
};
