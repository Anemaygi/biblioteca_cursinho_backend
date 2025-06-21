const pool = require('../config/db');
const queries = require('./queries');
const { formatarPenalidade } = require('./utils');

const getAll = async (req, res) => {
  try {
    const result = await pool.query(queries.getAll);
    res.json(result.rows.map(formatarPenalidade));  // Retorna os dados de penalidades em JSON
  } catch (err) {
    console.error("Erro ao buscar penalidades:", err);
    res.status(500).json({ error: 'Erro ao buscar penalidades', details: err.message });  // Retorna erro como JSON
  }
};

const addPenalidade = async (req, res) => {
  const { usuario_id, exemplar_codigo, emprestimo_data_inicio, tipo, causa, data_aplicacao, data_suspensao } = req.body;
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
    res.status(201).json(formatarPenalidade(result.rows[0]));  // Retorna o sucesso em JSON
  } catch (err) {
    console.error("Erro ao adicionar penalidade:", err);
    res.status(500).json({ error: 'Erro ao adicionar penalidade', details: err.message });  // Retorna erro como JSON
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
    if (result.rowCount === 0) return res.status(404).json({ error: 'Penalidade não encontrada' });  // Retorna erro se não encontrar
    res.json(formatarPenalidade(result.rows[0]));  // Retorna os dados atualizados em JSON
  } catch (err) {
    console.error("Erro ao editar penalidade:", err);
    res.status(500).json({ error: 'Erro ao editar penalidade', details: err.message });  // Retorna erro como JSON
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
    if (result.rowCount === 0) return res.status(404).json({ error: 'Penalidade não encontrada' });  // Retorna erro se não encontrar
    res.status(200).json({ message: 'Penalidade removida com sucesso' });  // Retorna sucesso
  } catch (err) {
    console.error("Erro ao remover penalidade:", err);
    res.status(500).json({ error: 'Erro ao remover penalidade', details: err.message });  // Retorna erro como JSON
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
    if (result.rowCount === 0) return res.status(404).json({ error: 'Penalidade não encontrada' });
