const remove = `
  DELETE FROM exemplar
  WHERE codigo = $1
  RETURNING *;
`;



module.exports = {
    remove
}