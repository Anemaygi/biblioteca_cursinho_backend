const getAll = `
  SELECT * FROM autor
  ORDER BY id;
`;

const getById = `
  SELECT * FROM autor
  WHERE id = $1;
`;

const insert = `
  INSERT INTO autor (nome)
  VALUES ($1)
  RETURNING *;
`;

const update = `
  UPDATE autor
  SET nome = $1
  WHERE id = $2
  RETURNING *;
`;

const remove = `
  DELETE FROM autor
  WHERE id = $1
  RETURNING *;
`;

module.exports = {
  getAll,
  getById,
  insert,
  update,
  remove
};
