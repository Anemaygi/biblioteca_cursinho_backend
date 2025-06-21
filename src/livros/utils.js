function formatarPenalidade(p) {
  return {
    usuarioId: p.usuario_id,
    exemplarCodigo: p.exemplar_codigo,
    emprestimoDataInicio: p.emprestimo_data_inicio,
    dataAplicacao: p.data_aplicacao,
    dataSuspensao: p.data_suspensao,
    tipo: p.tipo,
    causa: p.causa,
    statusCumprida: p.status_cumprida,
    usuarioNome: p.usuario_nome,
    tituloLivro: p.titulo_livro
  };
}

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

module.exports = {
  formatarPenalidade,
  formatarLivro
};
