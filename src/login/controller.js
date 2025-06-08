const bcrypt = require('bcrypt');
const queries = require('./queries');
const pool = require('../config/db');

const login = async (req, res) => {
  const { login, senha } = req.body;

  try {
    const result = await pool.query(queries.getByLogin, [login]);

    if (result.rowCount === 0) {
      return res.status(401).send("Login não encontrado");
    }

    const usuario = result.rows[0];
    const senhaCorreta = await bcrypt.compare(senha, usuario.senha_hash);

    if (!senhaCorreta) {
      return res.status(401).send("Senha incorreta");
    }

    res.status(200).json({ message: "Login bem-sucedido", login: usuario.login });
  } catch (err) {
    console.error("Erro ao logar:", err);
    res.status(500).send("Erro ao logar");
  }
};

module.exports = {
  login
};
