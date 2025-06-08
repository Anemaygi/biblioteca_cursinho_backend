const getAll = `
  SELECT 
    l.*,
    COUNT(e.codigo) AS total_exemplares,
    COUNT(*) FILTER (WHERE e.status_disponibilidade = TRUE) AS exemplares_disponiveis,
    COALESCE(
      JSON_AGG(DISTINCT JSONB_BUILD_OBJECT('id', a.id, 'nome', a.nome))
      FILTER (WHERE a.id IS NOT NULL),
      '[]'
    ) AS autores
  FROM 
    livro l
  LEFT JOIN exemplar e ON e.livro_id = l.id
  LEFT JOIN livro_autor la ON la.livro_id = l.id
  LEFT JOIN autor a ON a.id = la.autor_id
  GROUP BY l.id;
`;



const insert = `
  INSERT INTO livro (isbn, titulo, editora, edicao, categoria)
  VALUES ($1, $2, $3, $4, $5)
  RETURNING *;
`;

const update = `
  UPDATE livro
  SET isbn = $1,
      titulo = $2,
      editora = $3,
      edicao = $4,
      categoria = $5
  WHERE id = $6
  RETURNING *;
`;

const remove = `
  DELETE FROM livro
  WHERE id = $1
  RETURNING *;
`;


module.exports = {
    getAll,
    insert, 
    update, 
    remove
}