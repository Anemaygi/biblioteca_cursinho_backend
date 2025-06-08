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

const editLivro = async (req, res) => {
    const { id } = req.params;
    const { isbn, titulo, editora, edicao, categoria } = req.body;

    try {
        const result = await pool.query(queries.update, [
            isbn,
            titulo,
            editora,
            edicao,
            categoria,
            id
        ]);

        if (result.rowCount === 0) {
            return res.status(404).send("Livro não encontrado");
        }

        const livroAtualizado = utils.formatarLivro(result.rows[0]);
        res.json(livroAtualizado);
    } catch (err) {
        console.error("Erro ao atualizar livro:", err);
        res.status(500).send("Erro ao atualizar livro");
    }
};

const removeLivro = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query(queries.remove, [id]);

        if (result.rowCount === 0) {
            return res.status(404).send("Livro não encontrado");
        }

        res.status(200).send("Livro removido com sucesso");
    } catch (err) {
        console.error("Erro ao remover livro:", err);
        res.status(500).send("Erro ao remover livro");
    }
};


module.exports = {
    getAll,
    addLivro,
    editLivro,
    removeLivro
}