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



module.exports = {
    getAll,
    getAtrasados
}