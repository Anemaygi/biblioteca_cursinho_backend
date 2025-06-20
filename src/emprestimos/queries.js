// já existe
const getAllEmprestimos = ` ... `;

const deleteEmprestimo = `
  DELETE FROM emprestimo
  WHERE usuario_id = $1 AND exemplar_codigo = $2 AND data_inicio = $3
`;

const renovarEmprestimo = `
  UPDATE emprestimo
  SET renovado = TRUE
  WHERE usuario_id = $1 AND exemplar_codigo = $2 AND data_inicio = $3
`;

module.exports = {
  getAllEmprestimos,
  deleteEmprestimo,
  renovarEmprestimo,
};
