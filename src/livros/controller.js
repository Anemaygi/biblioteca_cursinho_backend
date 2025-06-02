const queries = require('./queries');
const utils = require('./utils');
const pool = require('../config/db');

const getAll = async (req,res) => {
    try{
        const result = await pool.query(queries.getAll)
        const livros = result.rows.map(utils.formatarLivro);
        res.json(livros);
    } catch (err) {
        console.error("Erro ao consultar livros:", err);
        res.status(500).send("Erro no banco de dados");
    }
}

const addLivro = async (req, res) => {
    const { isbn, titulo, editora, edicao, categoria, quantidade_exemplares } = req.body;

    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        const resultLivro = await client.query(queries.insert, [
            isbn,
            titulo,
            editora,
            edicao,
            categoria
        ]);
        const livroCriado = resultLivro.rows[0];

        for (let i = 1; i <= quantidade_exemplares; i++) {
            const codigo = `${livroCriado.id}-${i}`; 
            await client.query(
                `INSERT INTO exemplar (codigo, livro_id, status_disponibilidade)
                 VALUES ($1, $2, TRUE)`,
                [codigo, livroCriado.id]
            );
        }

        await client.query('COMMIT');
        const livroFormatado = {
            ...utils.formatarLivro(livroCriado),
            total_exemplares: quantidade_exemplares,
            exemplares_disponiveis: quantidade_exemplares
        };

        res.status(201).json(livroFormatado);
    } catch (err) {
        await client.query('ROLLBACK');
        console.error("Erro ao adicionar livro:", err);
        res.status(500).send("Erro ao adicionar livro");
    } finally {
        client.release();
    }
};


module.exports = {
    getAll,
    addLivro
}