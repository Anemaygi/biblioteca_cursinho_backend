function formatarPenalidade(penalidade) {
  return {
    id: penalidade.id,
    usuarioId: penalidade.usuario_id,
    usuarioNome: penalidade.usuario_nome,
    tipoId: penalidade.tipo_id,
    tipo: penalidade.tipo,
    causaId: penalidade.causa_id,
    causa: penalidade.causa,
    descricao: penalidade.descricao,
    data: penalidade.data,
    cumprida: penalidade.cumprida,
  };
}

module.exports = { formatarPenalidade };
