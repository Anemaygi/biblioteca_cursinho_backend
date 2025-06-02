function formatarLivro(livro) {
  return {
    isbn: livro.isbn,
    titulo: livro.titulo,
    editora: livro.editora,
    edicao: livro.edicao,
    categoria: livro.categoria,
    total_exemplares: livro.total_exemplares,
    exemplares_disponiveis: livro.exemplares_disponiveis
  };
}

module.exports = { formatarLivro };