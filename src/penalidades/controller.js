const pool = require('../config/db');
const queries = require('./queries');
const { formatarPenalidade } = require('./utils');

const getAll = async (req, res) => {
  try {
    console.log('🟡 [penalidade] Buscando todas as penalidades...');
    const result = await pool.query(queries.getAll);
    console.log(`🟢 [penalidade] ${result.rows.length} penalidades retornadas`);
    res.json(result.rows.map(formatarPenalidade));
  } catch (err) {
    console.error("🔴 ERRO ao buscar penalidades:", err.message, err.stack);
    res.status(500).send("Erro ao buscar penalidades");
  }
};

const addPenalidade = async (req, res) => {
  const {
    usuario_id,
    exemplar_codigo,
    emprestimo_data_inicio,
    tipo,
    causa,
    data_aplicacao,
    data_suspensao
  } = req.body;

  try {
    const result = await pool.query(queries.insert, [
      usuario_id,
      exemplar_codigo,
      emprestimo_data_inicio,
      data_aplicacao,
      data_suspensao,
      tipo,
      causa
    ]);
    res.status(201).json(formatarPenalidade(result.rows[0]));
  } catch (err) {
    console.error("Erro ao adicionar penalidade:", err.message);
    res.status(500).send("Erro ao adicionar penalidade");
  }
};

const editPenalidade = async (req, res) => {
  const { usuario_id, exemplar_codigo, emprestimo_data_inicio, data_aplicacao } = req.params;
  const { tipo, causa, data_suspensao, status } = req.body;

  try {
    const result = await pool.query(queries.update, [
      tipo,
      causa,
      data_suspensao,
      status,
      usuario_id,
      exemplar_codigo,
      emprestimo_data_inicio,
      data_aplicacao
    ]);
    if (result.rowCount === 0) return res.status(404).send("Penalidade não encontrada");
    res.json(formatarPenalidade(result.rows[0]));
  } catch (err) {
    console.error("Erro ao editar penalidade:", err.message);
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
      data_aplicacao
    ]);
    if (result.rowCount === 0) return res.status(404).send("Penalidade não encontrada");
    res.send("Penalidade removida com sucesso");
  } catch (err) {
    console.error("Erro ao remover penalidade:", err.message);
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
      data_aplicacao
    ]);
    if (result.rowCount === 0) return res.status(404).send("Penalidade não encontrada");
    res.json(formatarPenalidade(result.rows[0]));
  } catch (err) {
    console.error("Erro ao marcar penalidade como cumprida:", err.message);
    res.status(500).send("Erro ao atualizar penalidade");
  }
};

module.exports = {
  getAll,
  addPenalidade,
  editPenalidade,
  removePenalidade,
  marcarCumprida
};