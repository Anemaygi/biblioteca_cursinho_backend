const getAll = 
    `SELECT u.id, u.nome, u.gmail AS email, u.telefone, 
             u.status_regularidade AS status,
             u.cpf, e.logradouro, e.numero, e.complemento, e.cep
      FROM usuario u
      LEFT JOIN endereco e ON u.id = e.usuario_id`;

const getAtrasados = 
    `SELECT DISTINCT u.id, u.nome, u.gmail AS email, u.telefone, 
                      u.status_regularidade AS status,
                      u.cpf, e.logradouro, e.numero, e.complemento, e.cep
      FROM usuario u
      INNER JOIN emprestimo emp ON emp.usuario_id = u.id
      LEFT JOIN endereco e ON u.id = e.usuario_id
      WHERE emp.data_devolucao IS NULL 
        AND emp.data_fim_previsto < CURRENT_DATE`;

module.exports = {
    getAll,
    getAtrasados
}