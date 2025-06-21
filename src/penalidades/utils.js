function formatarPenalidade(p) {
  return {
    usuarioId: p.fk_usuario_id,
    exemplarCodigo: p.fk_livro_id,
    emprestimoDataInicio: p.fk_emprestimo_data_inicio,
    dataAplicacao: p.data_aplicada,
    dataSuspensao: p.data_suspensao,
    tipo: p.tipo,
    causa: p.causa,
    statusCumprida: p.status,
    usuarioNome: p.usuario_nome,
    tituloLivro: p.titulo_livro
  };
}

module.exports = { formatarPenalidade };
