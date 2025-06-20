const createReserva = `
  INSERT INTO reserva (usuario_id, exemplar_codigo, data_efetuacao) 
  VALUES ($1, $2, $3) 
  RETURNING *;
`;

const getAllReservas = `
  SELECT 
    r.usuario_id,
    r.exemplar_codigo,
    r.data_efetuacao,
    u.nome AS usuario_nome,
    l.titulo AS livro_titulo
  FROM reserva r
  JOIN usuario u ON r.usuario_id = u.id
  JOIN exemplar e ON r.exemplar_codigo = e.codigo
  JOIN livro l ON e.livro_id = l.id;
`;

const getLivrosComReservasEDisponiveis = `
  SELECT DISTINCT l.id, l.titulo
  FROM livro l
  JOIN exemplar e ON e.livro_id = l.id
  JOIN reserva r ON r.exemplar_codigo = e.codigo
  WHERE e.status_disponibilidade = TRUE;
`;

const getReservasPorLivroId = `
  SELECT 
    r.usuario_id,
    r.exemplar_codigo,
    r.data_efetuacao,
    u.nome AS usuario_nome,
    l.titulo AS livro_titulo
  FROM reserva r
  JOIN usuario u ON r.usuario_id = u.id
  JOIN exemplar e ON r.exemplar_codigo = e.codigo
  JOIN livro l ON e.livro_id = l.id
  WHERE l.id = $1
  ORDER BY r.data_efetuacao ASC;
`;

module.exports = {
  createReserva,
  getAllReservas,
  getLivrosComReservasEDisponiveis,
  getReservasPorLivroId
};
