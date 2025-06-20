const pool = require('../config/db')
const queries = require('./queries')

const getAll = async (req, res) => {
  try {
    const result = await pool.query(queries.getAll)
    res.status(200).json(result.rows)
  } catch (err) {
    res.status(500).send("Erro ao buscar empréstimos")
  }
}

const search = async (req, res) => {
  const termo = `%${req.query.q}%`
  try {
    const result = await pool.query(queries.getByUsuarioOuLivro, [termo])
    res.status(200).json(result.rows)
  } catch (err) {
    res.status(500).send("Erro ao buscar empréstimos")
  }
}

const add = async (req, res) => {
  const { usuario_id, exemplar_codigo } = req.body
  try {
    const result = await pool.query(queries.insert, [usuario_id, exemplar_codigo])
    res.status(201).json(result.rows[0])
  } catch (err) {
    console.error(err)
    res.status(500).send("Erro ao adicionar empréstimo")
  }
}

const remove = async (req, res) => {
  const { usuario_id, exemplar_codigo, data_inicio } = req.params
  try {
    await pool.query(queries.remove, [usuario_id, exemplar_codigo, data_inicio])
    res.status(200).send("Empréstimo removido com sucesso")
  } catch (err) {
    res.status(500).send("Erro ao remover empréstimo")
  }
}

const renovar = async (req, res) => {
  const { usuario_id, exemplar_codigo, data_inicio } = req.params
  try {
    const result = await pool.query(queries.renovar, [usuario_id, exemplar_codigo, data_inicio])
    res.status(200).json(result.rows[0])
  } catch (err) {
    res.status(500).send("Erro ao renovar empréstimo")
  }
}

const edit = async (req, res) => {
  const { usuario_id, exemplar_codigo, data_inicio } = req.params
  const { data_fim_previsto, data_devolucao } = req.body

  try {
    const result = await pool.query(queries.update, [usuario_id, exemplar_codigo, data_inicio, data_fim_previsto, data_devolucao])
    res.status(200).json(result.rows[0])
  } catch (err) {
    res.status(500).send("Erro ao editar empréstimo")
  }
}

module.exports = {
  getAll,
  search,
  add,
  remove,
  renovar,
  edit
}
