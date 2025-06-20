const getAllEmprestimos = `
  SELECT
    e.usuario_id,
    e.exemplar_codigo,
    e.data_inicio,
    e.data_fim_previsto,
    e.data_devolucao,
    e.renovado,
    u.nome AS usuario_nome,
    l.titulo AS livro_titulo
  FROM emprestimo e
  JOIN usuario u ON e.usuario_id = u.id
  JOIN exemplar ex ON e.exemplar_codigo = ex.codigo
  JOIN livro l ON ex.livro_id = l.id;
`;

const deleteEmprestimo = `
  DELETE FROM emprestimo
  WHERE usuario_id = $1 AND exemplar_codigo = $2 AND data_inicio = $3
  RETURNING *;
`;

const renovarEmprestimo = `
  UPDATE emprestimo
  SET 
    renovado = TRUE,
    data_fim_previsto = data_fim_previsto + INTERVAL '10 days'
  WHERE usuario_id = $1 AND exemplar_codigo = $2 AND data_inicio = $3
  RETURNING *;
`;

const adicionarEmprestimo = `
  INSERT INTO emprestimo (
    usuario_id,
    exemplar_codigo,
    data_inicio,
    data_fim_previsto
  ) VALUES ($1, $2, $3, $4)
  RETURNING *;
`;

const atualizarStatusExemplar = `
  UPDATE exemplar
  SET status_disponibilidade = FALSE
  WHERE codigo = $1;
`;

const marcarComoDevolvido = `
  UPDATE emprestimo
  SET data_devolucao = CURRENT_DATE
  WHERE usuario_id = $1 AND exemplar_codigo = $2 AND data_inicio = $3;

  UPDATE exemplar
  SET status_disponibilidade = TRUE
  WHERE codigo = $2;
`;

module.exports = {
  getAllEmprestimos,
  deleteEmprestimo,
  renovarEmprestimo,
  adicionarEmprestimo,
  atualizarStatusExemplar,
  marcarComoDevolvido
};
