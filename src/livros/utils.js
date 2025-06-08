// utils.js
function formatarLivro(livro) {
  return {
    id: livro.id,
    isbn: livro.isbn,
    titulo: livro.titulo,
    editora: livro.editora,
    edicao: livro.edicao,
    categoria: livro.categoria,
    total_exemplares: livro.total_exemplares,
    exemplares_disponiveis: livro.exemplares_disponiveis,
    autores: livro.autores || []
  };
}


module.exports = { formatarLivro };