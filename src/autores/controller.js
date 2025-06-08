const queries = require('./queries');
const pool = require('../config/db');

const getAll = async (req, res) => {
  try {
    const result = await pool.query(queries.getAll);
    res.json(result.rows);
  } catch (err) {
    console.error("Erro ao buscar autores:", err);
    res.status(500).send("Erro ao buscar autores");
  }
};

const getById = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(queries.getById, [id]);

    if (result.rowCount === 0) {
      return res.status(404).send("Autor não encontrado");
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Erro ao buscar autor:", err);
    res.status(500).send("Erro ao buscar autor");
  }
};

const addAutor = async (req, res) => {
  const { nome } = req.body;

  try {
    const result = await pool.query(queries.insert, [nome]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Erro ao adicionar autor:", err);
    res.status(500).send("Erro ao adicionar autor");
  }
};

const updateAutor = async (req, res) => {
  const { id } = req.params;
  const { nome } = req.body;

  try {
    const result = await pool.query(queries.update, [nome, id]);

    if (result.rowCount === 0) {
      return res.status(404).send("Autor não encontrado");
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Erro ao atualizar autor:", err);
    res.status(500).send("Erro ao atualizar autor");
  }
};

const removeAutor = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(queries.remove, [id]);

    if (result.rowCount === 0) {
      return res.status(404).send("Autor não encontrado");
    }

    res.status(200).send("Autor removido com sucesso");
  } catch (err) {
    console.error("Erro ao remover autor:", err);
    res.status(500).send("Erro ao remover autor");
  }
};

module.exports = {
  getAll,
  getById,
  addAutor,
  updateAutor,
  removeAutor
};
