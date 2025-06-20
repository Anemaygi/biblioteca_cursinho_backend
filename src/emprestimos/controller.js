const pool = require('../config/db');
const queries = require('./queries');

const getAll = async (req, res) => {
  try {
    const { rows } = await pool.query(queries.getAllEmprestimos);
    res.status(200).json(rows);
  } catch (err) {
    console.error("Erro ao buscar empréstimos:", err);
    res.status(500).send("Erro ao buscar empréstimos");
  }
};

const deleteEmprestimo = async (req, res) => {
  const { usuario_id, exemplar_codigo, data_inicio } = req.body;
  try {
    await pool.query(queries.deleteEmprestimo, [usuario_id, exemplar_codigo, data_inicio]);
    res.status(200).send("Empréstimo deletado com sucesso");
  } catch (err) {
    console.error("Erro ao deletar empréstimo:", err);
    res.status(500).send("Erro ao deletar empréstimo");
  }
};

const renovarEmprestimo = async (req, res) => {
  const { usuario_id, exemplar_codigo, data_inicio } = req.body;
  try {
    await pool.query(queries.renovarEmprestimo, [usuario_id, exemplar_codigo, data_inicio]);
    res.status(200).send("Empréstimo renovado com sucesso");
  } catch (err) {
    console.error("Erro ao renovar empréstimo:", err);
    res.status(500).send("Erro ao renovar empréstimo");
  }
};

module.exports = {
  getAll,
  deleteEmprestimo,
  renovarEmprestimo
};
