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

module.exports = { formatarPenalidade };
