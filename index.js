require("dotenv").config();
const express = require("express");
const cors = require("cors");
const usuariosRoutes = require('./src/usuarios/routes');

const app = express();

// Middlewares ESSENCIAIS (ordem importa!)
app.use(express.json()); // <-- Parseia JSON primeiro
app.use(cors()); // <-- Habilita CORS depois

// Rota raiz
app.get("/", (req, res) => {
  res.send("Backend da Biblioteca do Cursinho. Feito por Ana Clara, Giane e Giovanna");
});

// Rotas de usuários
app.use('/usuarios', usuariosRoutes);

// Inicia servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
