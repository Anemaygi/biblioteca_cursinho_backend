const queries = require('./queries');
const pool = require('../config/db');

const removeExemplar = async (req, res) => {
    const { codigo } = req.params;

    try {
        const result = await pool.query(queries.remove, [codigo]);

        if (result.rowCount === 0) {
            return res.status(404).send("Exemplar não encontrado");
        }

        res.status(200).send("Exemplar removido com sucesso");
    } catch (err) {
        console.error("Erro ao remover exemplar:", err);
        res.status(500).send("Erro ao remover exemplar");
    }
};

module.exports = {
    removeExemplar
}