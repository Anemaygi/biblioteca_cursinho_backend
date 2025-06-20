const getAllEmprestimos = `
  SELECT
    e.usuario_id,
    e.exemplar_codigo,
    e.data_inicio,
    e.data_fim_previsto,
    e.data_devolucao,
    e.renovado,
    u.nome AS usuario_nome,
    l.titulo AS livro_titulo
  FROM emprestimo e
  JOIN usuario u ON e.usuario_id = u.id
  JOIN exemplar ex ON e.exemplar_codigo = ex.codigo
  JOIN livro l ON ex.livro_id = l.id;
`;

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
  renovarEmprestimo
};
