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
  const { usuario_id, exemplar_codigo, data_inicio } = req.params;
  const dataFormatada = data_inicio.split('T')[0];  // Garantir que a data esteja no formato 'YYYY-MM-DD'

  try {
    const result = await pool.query(queries.deleteEmprestimo, [
      usuario_id,
      exemplar_codigo,
      dataFormatada
    ]);

    if (result.rowCount === 0) {
      return res.status(404).send("Empréstimo não encontrado");
    }

    res.status(200).send("Empréstimo deletado com sucesso");
  } catch (err) {
    console.error("Erro ao deletar empréstimo:", err);
    res.status(500).send("Erro ao deletar empréstimo");
  }
};

const renovarEmprestimo = async (req, res) => {
  const { usuario_id, exemplar_codigo, data_inicio } = req.params;
  const dataFormatada = data_inicio.split('T')[0];  // Garantir o formato 'YYYY-MM-DD'

  try {
    const result = await pool.query(queries.renovarEmprestimo, [
      usuario_id,
      exemplar_codigo,
      dataFormatada
    ]);

    if (result.rowCount === 0) {
      return res.status(404).send("Empréstimo não encontrado para renovação");
    }

    res.status(200).send("Empréstimo renovado com sucesso");
  } catch (err) {
    console.error("Erro ao renovar empréstimo:", err);
    res.status(500).send("Erro ao renovar empréstimo");
  }
};

const adicionarEmprestimo = async (req, res) => {
  const { usuario_id, exemplar_codigo, data_inicio, data_fim_previsto } = req.body;

  try {
    await pool.query('BEGIN');

    const emprestimo = await pool.query(queries.adicionarEmprestimo, [
      usuario_id,
      exemplar_codigo,
      data_inicio,
      data_fim_previsto
    ]);

    await pool.query(queries.atualizarStatusExemplar, [exemplar_codigo]);

    await pool.query('COMMIT');

    res.status(201).json(emprestimo.rows[0]);
  } catch (err) {
    await pool.query('ROLLBACK');
    console.error("Erro ao adicionar empréstimo:", err);
    res.status(500).send("Erro ao adicionar empréstimo");
  }
};

const marcarComoDevolvido = async (req, res) => {
  const { usuario_id, exemplar_codigo, data_inicio } = req.params;
  const dataFormatada = data_inicio.split('T')[0];  // Garantir o formato 'YYYY-MM-DD'

  try {
    await pool.query('BEGIN');

    await pool.query(queries.marcarComoDevolvido, [
      usuario_id,
      exemplar_codigo,
      dataFormatada
    ]);

    await pool.query('COMMIT');

    res.status(200).send("Empréstimo marcado como devolvido");
  } catch (err) {
    await pool.query('ROLLBACK');
    console.error("Erro ao marcar como devolvido:", err);
    res.status(500).send("Erro ao marcar como devolvido");
  }
};

module.exports = {
  getAll,
  deleteEmprestimo,
  renovarEmprestimo,
  adicionarEmprestimo,
  marcarComoDevolvido
};
