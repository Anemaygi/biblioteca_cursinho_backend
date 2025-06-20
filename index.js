require("dotenv").config();
const express = require("express");
const cors = require("cors");

const usuariosRoutes = require('./src/usuarios/routes')
const livrosRoutes = require('./src/livros/routes')
const exemplaresRoutes = require('./src/exemplares/routes')
const loginRoutes = require('./src/login/routes')
const autoresRoutes = require('./src/autores/routes');
const penalidadesRoutes = require('./src/penalidades/routes');
const reservasRoutes = require('./src/reservas/routes');
const emprestimosRoutes = require('./src/emprestimos/routes')

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
app.use('/livros', livrosRoutes);
app.use('/exemplares', exemplaresRoutes);
app.use('/login', loginRoutes);
app.use('/autores', autoresRoutes);
app.use('/penalidade', penalidadesRoutes);
app.use('/reservas', reservasRoutes);
app.use('/emprestimos', emprestimosRoutes)




const PORT = process.env.PORT || 3999;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
