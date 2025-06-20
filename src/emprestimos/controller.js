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
  let { usuario_id, exemplar_codigo, data_inicio } = req.params;
  console.log('Recebido para exclusão:', req.params);

  try {
    const data = new Date(data_inicio);
    if (isNaN(data)) throw new Error("Data inválida");

    const dataFormatada = data.toISOString().split('T')[0];

    const result = await pool.query(queries.deleteEmprestimo, [
      usuario_id,
      exemplar_codigo,
      dataFormatada
    ]);

    if (result.rowCount === 0) {
      console.warn("Nenhum empréstimo encontrado para deletar:", usuario_id, exemplar_codigo, dataFormatada);
      return res.status(404).send("Empréstimo não encontrado");
    }

    res.status(200).send("Empréstimo deletado com sucesso");
  } catch (err) {
    console.error("Erro ao deletar empréstimo:", err.message || err);
    res.status(500).send("Erro ao deletar empréstimo");
  }
};

const renovarEmprestimo = async (req, res) => {
  const { usuario_id, exemplar_codigo, data_inicio } = req.params;
  try {
    const data = new Date(data_inicio);
    if (isNaN(data)) throw new Error("Data inválida");
    const dataFormatada = data.toISOString().split('T')[0];

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
    console.error("Erro ao renovar empréstimo:", err.message || err);
    res.status(500).send("Erro ao renovar empréstimo");
  }
};

module.exports = {
  getAll,
  deleteEmprestimo,
  renovarEmprestimo
};
