const queries = require('./queries');
const utils = require('./utils');
const pool = require('../config/db');


function formatarEndereco(logradouro, numero, complemento, cep) {
  let endereco = `${logradouro}, ${numero}`;
  if (complemento) {
    endereco += ` - ${complemento}`;
  }
  endereco += `\n${cep}`;
  return endereco;
}

const getAll = async (req,res) => {
    try{
        const result = await pool.query(queries.getAll)
        const usuarios = result.rows.map(utils.formatarUsuario);
        res.json(usuarios);
    } catch (err) {
        console.error("Erro ao consultar usuários:", err);
        res.status(500).send("Erro no banco de dados");
    }
}


const getAtrasados = async (req,res) => {
    try{
        const result = await pool.query(queries.getAtrasados)
        const usuarios = result.rows.map(utils.formatarUsuario);
        res.json(usuarios);
    } catch (err) {
        console.error("Erro ao consultar usuários:", err);
        res.status(500).send("Erro no banco de dados");
    }
}

const create = async (req, res) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // 1. Cria usuário
    const { nome, cpf, gmail, telefone, ...endereco } = req.body;
    const userResult = await client.query(queries.createUser, 
      [nome, cpf, gmail, telefone]);
    
    // 2. Cria endereço
    const addressResult = await client.query(queries.createAddress, [
      userResult.rows[0].id,
      endereco.cep,
      endereco.logradouro,
      endereco.numero,
      endereco.complemento
    ]);

    await client.query('COMMIT');
    res.status(201).json({
      ...userResult.rows[0],
      endereco: addressResult.rows[0]
    });

  } catch (err) {
    await client.query('ROLLBACK');
    console.error("Erro ao criar usuário:", err);
    res.status(500).send("Erro no banco de dados");
  } finally {
    client.release();
  }
};


const update = async (req, res) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const id = parseInt(req.params.id);
    const { nome, cpf, gmail, telefone, ...endereco } = req.body;

    // 1. Atualiza usuário
    const userResult = await client.query(queries.updateUser, 
      [nome, cpf, gmail, telefone, id]);
    
    // 2. Atualiza endereço
    const addressResult = await client.query(queries.updateAddress, [
      endereco.cep,
      endereco.logradouro,
      endereco.numero,
      endereco.complemento,
      id
    ]);

    await client.query('COMMIT');
    res.json({
      ...userResult.rows[0],
      endereco: addressResult.rows[0]
    });

  } catch (err) {
    await client.query('ROLLBACK');
    console.error("Erro ao atualizar usuário:", err);
    res.status(500).send("Erro no banco de dados");
  } finally {
    client.release();
  }
};


const remove = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await pool.query(queries.deleteUser, [id]);
    res.status(204).send();
  } catch (err) {
    console.error("Erro ao excluir usuário:", err);
    res.status(500).send("Erro no banco de dados");
  }
};

module.exports = {
  getAll,
  getAtrasados,
  create,
  update,
  remove
};
