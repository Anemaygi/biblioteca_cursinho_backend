const getAll = `
  SELECT p.*, u.nome AS usuario_nome, l.titulo AS titulo_livro
  FROM penalidade p
  JOIN usuario u ON p.fk_usuario_id = u.id
  JOIN emprestimo e ON p.fk_usuario_id = e.fk_usuario_id
                   AND p.fk_livro_id = e.fk_livro_id
                   AND p.fk_emprestimo_data_inicio = e.data_inicio::date
  JOIN livro l ON p.fk_livro_id = l.id
  ORDER BY p.data_aplicada DESC;
`;

const insert = `
  INSERT INTO penalidade (
    fk_usuario_id, fk_livro_id, fk_emprestimo_data_inicio,
    data_aplicada, data_suspensao, tipo, causa, status
  ) VALUES ($1, $2, $3, $4, $5, $6, $7, FALSE)
  RETURNING *;
`;

const update = `
  UPDATE penalidade
  SET tipo = $1, causa = $2, data_suspensao = $3, status = $4
  WHERE fk_usuario_id = $5 AND fk_livro_id = $6 AND fk_emprestimo_data_inicio = $7 AND data_aplicada = $8
  RETURNING *;
`;

const remove = `
  DELETE FROM penalidade
  WHERE fk_usuario_id = $1 AND fk_livro_id = $2 AND fk_emprestimo_data_inicio = $3 AND data_aplicada = $4
  RETURNING *;
`;

const markCumprida = `
  UPDATE penalidade
  SET status = TRUE
  WHERE fk_usuario_id = $1 AND fk_livro_id = $2 AND fk_emprestimo_data_inicio = $3 AND data_aplicada = $4
  RETURNING *;
`;

module.exports = {
  getAll,
  insert,
  update,
  remove,
  markCumprida
};
