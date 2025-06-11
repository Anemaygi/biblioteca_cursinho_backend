const pool = require('../config/db');
const queries = require('./queries');

const getAll = async (req, res) => {
  try {
    const result = await pool.query(queries.getAll);
    res.json(result.rows);
  } catch (err) {
    console.error("Erro ao buscar penalidades:", err);
    res.status(500).send("Erro ao buscar penalidades");
  }
};

const addPenalidade = async (req, res) => {
  const { usuario_id, tipo_id, causa_id, descricao, data } = req.body;
  try {
    const result = await pool.query(queries.insert, [usuario_id, tipo_id, causa_id, descricao, data]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Erro ao adicionar penalidade:", err);
    res.status(500).send("Erro ao adicionar penalidade");
  }
};

const editPenalidade = async (req, res) => {
  const { id } = req.params;
  const { usuario_id, tipo_id, causa_id, descricao, data, cumprida } = req.body;
  try {
    const result = await pool.query(queries.update, [usuario_id, tipo_id, causa_id, descricao, data, cumprida, id]);
    if (result.rowCount === 0) return res.status(404).send("Penalidade não encontrada");
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Erro ao editar penalidade:", err);
    res.status(500).send("Erro ao editar penalidade");
  }
};

const removePenalidade = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(queries.remove, [id]);
    if (result.rowCount === 0) return res.status(404).send("Penalidade não encontrada");
    res.send("Penalidade removida com sucesso");
  } catch (err) {
    console.error("Erro ao remover penalidade:", err);
    res.status(500).send("Erro ao remover penalidade");
  }
};

const marcarCumprida = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(queries.markCumprida, [id]);
    if (result.rowCount === 0) return res.status(404).send("Penalidade não encontrada");
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Erro ao marcar penalidade como cumprida:", err);
    res.status(500).send("Erro ao atualizar penalidade");
  }
};

const getByUsuario = async (req, res) => {
  const { usuario_id } = req.params;
  try {
    const result = await pool.query(queries.getByUsuario, [usuario_id]);
    res.json(result.rows);
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
