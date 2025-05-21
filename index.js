require("dotenv").config();

const express = require("express");
const cors = require("cors");

const usuariosRoutes = require('./src/usuarios/routes')

const app = express();

app.use(cors());

app.get("/", (req, res) => {
  res.send("Backend da Biblioteca do Cursinho. Feito por Ana Clara, Giane e Giovanna");
});

app.use('/usuarios', usuariosRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
