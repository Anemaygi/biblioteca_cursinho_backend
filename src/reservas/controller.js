// src/reservas/controller.js
const pool = require('../config/db'); // Ajuste o caminho se necessário
const queries = require('./queries');

const createReserva = async (req, res) => {
    const { usuario_id, exemplar_codigo, data_efetuacao } = req.body;

    if (!usuario_id || !exemplar_codigo || !data_efetuacao) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }

    const client = await pool.connect();
    try {
        const exemplarResult = await client.query(
            "SELECT status_disponibilidade FROM exemplar WHERE codigo = $1",
            [exemplar_codigo]
        );

        if (exemplarResult.rows.length === 0) {
            return res.status(404).json({ message: "Exemplar não encontrado." });
        }

        const isDisponivel = exemplarResult.rows[0].status_disponibilidade;

        if (isDisponivel) { // se for TRUE
            return res.status(400).json({ message: "Este exemplar está disponível e não pode ser reservado." });
        }
        await client.query('BEGIN'); // Inicia transação

        // Insere a nova reserva
        const result = await client.query(queries.createReserva, [usuario_id, exemplar_codigo, data_efetuacao]);

        await client.query('COMMIT'); // Confirma a transação
        res.status(201).json(result.rows[0]);

    } catch (error) {
        await client.query('ROLLBACK'); // Desfaz em caso de erro
        console.error(error); // O erro original do banco será impresso logo abaixo
        if (error.code === '23505') {
            return res.status(409).json({ message: 'Este usuário já possui uma reserva para este exemplar.' }); // 409 Conflict é mais apropriado
        }
        res.status(500).json({ message: 'Erro ao criar reserva.' });
    } finally {
        client.release();
    }
};

module.exports = {
    createReserva,
};