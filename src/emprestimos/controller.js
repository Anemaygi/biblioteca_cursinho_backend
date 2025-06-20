const pool = require('../config/db')
const queries = require('./queries')

const getAll = async (req, res) => {
  try {
    const { rows } = await pool.query(queries.getAllEmprestimos)
    res.status(200).json(rows)
  } catch (err) {
    console.error("Erro ao buscar empréstimos:", err)
    res.status(500).send("Erro ao buscar empréstimos")
  }
}

module.exports = {
  getAll
}
