const getAll = `
  SELECT p.*, u.nome AS usuario_nome, t.tipo, c.causa
  FROM penalidade p
  LEFT JOIN usuario u ON p.usuario_id = u.id
  LEFT JOIN tipo_penalidade t ON p.tipo_id = t.id
  LEFT JOIN causa_penalidade c ON p.causa_id = c.id
  ORDER BY p.data DESC;
`;

const insert = `
  INSERT INTO penalidade (usuario_id, tipo_id, causa_id, descricao, data, cumprida)
  VALUES ($1, $2, $3, $4, $5, FALSE)
  RETURNING *;
`;

const update = `
  UPDATE penalidade
  SET usuario_id = $1, tipo_id = $2, causa_id = $3, descricao = $4, data = $5, cumprida = $6
  WHERE id = $7
  RETURNING *;
`;

const remove = `
  DELETE FROM penalidade
  WHERE id = $1
  RETURNING *;
`;

const markCumprida = `
  UPDATE penalidade
  SET cumprida = TRUE
  WHERE id = $1
  RETURNING *;
`;

const getByUsuario = `
  SELECT * FROM penalidade
  WHERE usuario_id = $1;
`;

module.exports = {
  getAll,
  insert,
  update,
  remove,
  markCumprida,
  getByUsuario,
};
