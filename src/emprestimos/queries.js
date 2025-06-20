const getAll = `
  SELECT * FROM emprestimo ORDER BY data_inicio DESC;
`;

const getByUsuarioOuLivro = `
  SELECT * FROM emprestimo
  WHERE usuario_id::text ILIKE $1 OR exemplar_codigo ILIKE $1;
`;

const insert = `
  INSERT INTO emprestimo (usuario_id, exemplar_codigo, data_inicio, data_fim_previsto)
  VALUES ($1, $2, CURRENT_DATE, CURRENT_DATE + INTERVAL '10 days')
  RETURNING *;
`;

const remove = `
  DELETE FROM emprestimo
  WHERE usuario_id = $1 AND exemplar_codigo = $2 AND data_inicio = $3;
`;

const renovar = `
  UPDATE emprestimo
  SET data_fim_previsto = data_fim_previsto + INTERVAL '10 days',
      renovado = TRUE
  WHERE usuario_id = $1 AND exemplar_codigo = $2 AND data_inicio = $3
  RETURNING *;
`;

const update = `
  UPDATE emprestimo
  SET data_fim_previsto = $4, data_devolucao = $5
  WHERE usuario_id = $1 AND exemplar_codigo = $2 AND data_inicio = $3
  RETURNING *;
`;

module.exports = {
  getAll,
  getByUsuarioOuLivro,
  insert,
  remove,
  renovar,
  update
}
