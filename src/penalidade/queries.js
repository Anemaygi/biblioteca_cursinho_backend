const getAll = `
  SELECT 
    p.usuario_id,
    p.exemplar_codigo,
    p.emprestimo_data_inicio,
    p.data_aplicacao,
    p.data_suspensao,
    p.status_cumprida,
    t.nome AS tipo,
    c.nome AS causa,
    u.nome AS usuario_nome,
    l.titulo AS titulo_livro
  FROM penalidade p
  LEFT JOIN usuario u ON p.usuario_id = u.id
  LEFT JOIN exemplar e ON p.exemplar_codigo = e.codigo
  LEFT JOIN livro l ON e.livro_id = l.id
  LEFT JOIN penalidade_tipo t ON p.tipo_id = t.id
  LEFT JOIN penalidade_causa c ON p.causa_id = c.id
  ORDER BY p.data_aplicacao DESC;
`;

const insert = `
  INSERT INTO penalidade (
    usuario_id, exemplar_codigo, emprestimo_data_inicio, 
    data_aplicacao, data_suspensao, tipo_id, causa_id, status_cumprida
  ) VALUES ($1, $2, $3, $4, $5, $6, $7, FALSE)
  RETURNING *;
`;

const update = `
  UPDATE penalidade
  SET tipo_id = $1, causa_id = $2, data_suspensao = $3, status_cumprida = $4
  WHERE usuario_id = $5 AND exemplar_codigo = $6 
    AND emprestimo_data_inicio = $7 AND data_aplicacao = $8
  RETURNING *;
`;

const remove = `
  DELETE FROM penalidade
  WHERE usuario_id = $1 AND exemplar_codigo = $2 
    AND emprestimo_data_inicio = $3 AND data_aplicacao = $4
  RETURNING *;
`;

const markCumprida = `
  UPDATE penalidade
  SET status_cumprida = TRUE
  WHERE usuario_id = $1 AND exemplar_codigo = $2 
    AND emprestimo_data_inicio = $3 AND data_aplicacao = $4
  RETURNING *;
`;

const getByUsuario = `
  SELECT 
    p.usuario_id,
    p.exemplar_codigo,
    p.emprestimo_data_inicio,
    p.data_aplicacao,
    p.data_suspensao,
    p.status_cumprida,
    t.nome AS tipo,
    c.nome AS causa,
    u.nome AS usuario_nome,
    l.titulo AS titulo_livro
  FROM penalidade p
  LEFT JOIN usuario u ON p.usuario_id = u.id
  LEFT JOIN exemplar e ON p.exemplar_codigo = e.codigo
  LEFT JOIN livro l ON e.livro_id = l.id
  LEFT JOIN penalidade_tipo t ON p.tipo_id = t.id
  LEFT JOIN penalidade_causa c ON p.causa_id = c.id
  WHERE p.usuario_id = $1
  ORDER BY p.data_aplicacao DESC;
`;

module.exports = {
  getAll,
  insert,
  update,
  remove,
  markCumprida,
  getByUsuario,
};
