const createReserva = `
  INSERT INTO reserva (usuario_id, exemplar_codigo, data_efetuacao) 
  VALUES ($1, $2, $3) 
  RETURNING *
`;

module.exports = {
  createReserva,
};