require("dotenv").config();
const express = require("express");
const { Pool } = require("pg");

const app = express();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT),
  ssl: {
    rejectUnauthorized: false
  }
});

// Rota de teste simples
app.get("/", (req, res) => {
  res.json(["Teste1", "Está rodando"]);
});

// Helper para formatar endereço
function formatarEndereco(logradouro, numero, complemento, cep) {
  let endereco = `${logradouro}, ${numero}`;
  if (complemento) {
    endereco += ` - ${complemento}`;
  }
  endereco += `\n${cep}`;
  return endereco;
}

// Rota: Todos os usuários (com endereço formatado)
app.get("/usuarios", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT u.id, u.nome, u.gmail AS email, u.telefone, 
             u.status_regularidade AS status,
             u.cpf, e.logradouro, e.numero, e.complemento, e.cep
      FROM usuario u
      LEFT JOIN endereco e ON u.id = e.usuario_id
    `);

    const usuarios = result.rows.map(u => ({
      id: u.id,
      nome: u.nome,
      email: u.email,
      telefone: u.telefone,
      status: u.status ? 'Regular' : 'Bloqueado',
      cpf: parseInt(u.cpf),
      address: formatarEndereco(u.logradouro, u.numero, u.complemento, u.cep)
    }));

    res.json(usuarios);
  } catch (err) {
    console.error("Erro ao consultar usuários:", err);
    res.status(500).send("Erro no banco de dados");
  }
});

// Rota: Usuários com empréstimos atrasados
app.get("/usuarios/atrasados", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT DISTINCT u.id, u.nome, u.gmail AS email, u.telefone, 
                      u.status_regularidade AS status,
                      u.cpf, e.logradouro, e.numero, e.complemento, e.cep
      FROM usuario u
      INNER JOIN emprestimo emp ON emp.usuario_id = u.id
      LEFT JOIN endereco e ON u.id = e.usuario_id
      WHERE emp.data_devolucao IS NULL 
        AND emp.data_fim_previsto < CURRENT_DATE
    `);

    const usuarios = result.rows.map(u => ({
      id: u.id,
      nome: u.nome,
      email: u.email,
      telefone: u.telefone,
      status: u.status ? 'Regular' : 'Bloqueado',
      cpf: parseInt(u.cpf),
      address: formatarEndereco(u.logradouro, u.numero, u.complemento, u.cep)
    }));

    res.json(usuarios);
  } catch (err) {
    console.error("Erro ao consultar usuários atrasados:", err);
    res.status(500).send("Erro no banco de dados");
  }
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
