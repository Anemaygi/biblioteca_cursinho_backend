const pool = require('../config/db');
const queries = require('./queries');

const getAll = async (req, res) => {
  try {
    const { rows } = await pool.query(queries.getAllEmprestimos);

    // Garantir que as datas sejam convertidas corretamente para string no formato 'YYYY-MM-DD'
    const emprestimos = rows.map(emprestimo => ({
      ...emprestimo,
      data_inicio: formatDate(emprestimo.data_inicio),
      data_fim_previsto: formatDate(emprestimo.data_fim_previsto),
      data_devolucao: emprestimo.data_devolucao ? formatDate(emprestimo.data_devolucao) : null,
    }));

    res.status(200).json(emprestimos);
  } catch (err) {
    console.error("Erro ao buscar empréstimos:", err);
    res.status(500).send("Erro ao buscar empréstimos");
  }
};

// Função para garantir que a data seja formatada corretamente
function formatDate(date) {
  if (date instanceof Date) {
    return date.toISOString().split('T')[0];  // Formato 'YYYY-MM-DD'
  }
  return date; // Caso a data já esteja no formato correto, retorna sem alteração
}

const deleteEmprestimo = async (req, res) => {
  const { usuario_id, exemplar_codigo, data_inicio } = req.params;
  const dataFormatada = formatDate(data_inicio);

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
  const dataFormatada = formatDate(data_inicio);

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

  // Garantir que as datas estejam no formato 'YYYY-MM-DD'
  const dataInicioFormatada = formatDate(data_inicio);
  const dataFimPrevistoFormatada = formatDate(data_fim_previsto);

  try {
    await pool.query('BEGIN');

    const emprestimo = await pool.query(queries.adicionarEmprestimo, [
      usuario_id,
      exemplar_codigo,
      dataInicioFormatada,
      dataFimPrevistoFormatada
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
  const dataFormatada = formatDate(data_inicio);

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
