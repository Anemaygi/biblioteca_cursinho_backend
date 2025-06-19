const queries = require('./queries');
const pool = require('../config/db');

const removeExemplar = async (req, res) => {
    const { codigo } = req.params;

    try {
        const result = await pool.query(queries.remove, [codigo]);

        if (result.rowCount === 0) {
            return res.status(404).send("Exemplar não encontrado");
        }

        res.status(200).send("Exemplar removido com sucesso");
    } catch (err) {
        console.error("Erro ao remover exemplar:", err);
        res.status(500).send("Erro ao remover exemplar");
    }
};


const addExemplar = async (req, res) => {
  const { livro_id } = req.body;

  if (!livro_id) {
    return res.status(400).send("livro_id é obrigatório");
  }

  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    const { rows } = await client.query(queries.countByLivroId, [livro_id]);
    const count = parseInt(rows[0].count, 10);

    const codigo = `${livro_id}-${count + 1}`;

    const result = await client.query(queries.insert, [codigo, livro_id]);

    await client.query('COMMIT');
    res.status(201).json(result.rows[0]);
  } catch (err) {
    await client.query('ROLLBACK');
    console.error("Erro ao adicionar exemplar:", err);
    res.status(500).send("Erro ao adicionar exemplar");
  } finally {
    client.release();
  }
};

module.exports = {
    removeExemplar,
    addExemplar
}