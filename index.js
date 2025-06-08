require("dotenv").config();

const express = require("express");
const cors = require("cors");

const usuariosRoutes = require('./src/usuarios/routes')
const livrosRoutes = require('./src/livros/routes')
const exemplaresRoutes = require('./src/exemplares/routes')

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Backend da Biblioteca do Cursinho. Feito por Ana Clara, Giane e Giovanna");
});

app.use('/usuarios', usuariosRoutes);
app.use('/livros', livrosRoutes);
app.use('/exemplares', exemplaresRoutes);



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
