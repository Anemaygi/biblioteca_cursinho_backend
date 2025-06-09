const remove = `
  DELETE FROM exemplar
  WHERE codigo = $1
  RETURNING *;
`;

const countByLivroId = `
  SELECT COUNT(*) FROM exemplar WHERE livro_id = $1;
`;

const insert = `
  INSERT INTO exemplar (codigo, livro_id, status_disponibilidade)
  VALUES ($1, $2, TRUE)
  RETURNING *;
`;

module.exports = {
  countByLivroId,
  insert,
  remove
};
