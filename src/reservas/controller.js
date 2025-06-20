const pool = require('../config/db');
const queries = require('./queries');

const getAllReservas = async (req, res) => {
  try {
    const { rows } = await pool.query(queries.getAllReservas);
    res.status(200).json(rows);
  } catch (error) {
    console.error('Erro ao buscar reservas:', error);
    res.status(500).json({ message: 'Erro ao buscar reservas.' });
  }
};

const createReserva = async (req, res) => {
  const { usuario_id, exemplar_codigo, data_efetuacao } = req.body;

  if (!usuario_id || !exemplar_codigo || !data_efetuacao) {
    return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
  }

  const client = await pool.connect();
  try {
    const exemplarResult = await client.query(
      "SELECT status_disponibilidade FROM exemplar WHERE codigo = $1",
      [exemplar_codigo]
    );

    if (exemplarResult.rows.length === 0) {
      return res.status(404).json({ message: "Exemplar não encontrado." });
    }

    const isDisponivel = exemplarResult.rows[0].status_disponibilidade;

    if (isDisponivel) {
      return res.status(400).json({ message: "Este exemplar está disponível e não pode ser reservado." });
    }

    await client.query('BEGIN');
    const result = await client.query(queries.createReserva, [usuario_id, exemplar_codigo, data_efetuacao]);
    await client.query('COMMIT');

    res.status(201).json(result.rows[0]);

  } catch (error) {
    await client.query('ROLLBACK');
    console.error(error);
    if (error.code === '23505') {
      return res.status(409).json({ message: 'Este usuário já possui uma reserva para este exemplar.' });
    }
    res.status(500).json({ message: 'Erro ao criar reserva.' });
  } finally {
    client.release();
  }
};

const getLivrosComReservasEDisponiveis = async (req, res) => {
  try {
    const { rows } = await pool.query(queries.getLivrosComReservasEDisponiveis);
    res.status(200).json(rows);
  } catch (error) {
    console.error('Erro ao buscar livros com reservas:', error);
    res.status(500).json({ message: 'Erro ao buscar livros com reservas.' });
  }
};

const getReservasPorLivroId = async (req, res) => {
  const { livroId } = req.params;
  try {
    const { rows } = await pool.query(queries.getReservasPorLivroId, [livroId]);
    res.status(200).json(rows);
  } catch (error) {
    console.error('Erro ao buscar reservas por livro:', error);
    res.status(500).json({ message: 'Erro ao buscar reservas por livro.' });
  }
};

module.exports = {
  createReserva,
  getAllReservas,
  getLivrosComReservasEDisponiveis,
  getReservasPorLivroId
};
