require("dotenv").config();
var express = require("express");
const { Pool } = require("pg");

var app = express();

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

app.get("/url", (req, res, next) => {
 res.json(["Tony","Lisa","Michael","Ginger","Food"]);
});


app.get("/usuarios", async (req, res) => {
  try {
    const result = await pool.query("SELECT nome FROM usuarios");
    res.json(result.rows); 
  } catch (err) {
    console.error("Erro ao consultar banco:", err);
    res.status(500).send("Erro no banco de dados");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
