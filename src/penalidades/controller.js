const queries = require('./queries')

async function getPenalidades(req, res) {
  try {
    const result = await queries.listarPenalidades()
    res.json(result.rows)
  } catch (e) {
    res.status(500).json({ error: 'Erro ao buscar penalidades' })
  }
}

async function postPenalidade(req, res) {
  try {
    const penalidade = req.body

    // cria penalidade
    const novaPenalidade = await queries.criarPenalidade(penalidade)

    // se causa for perda ou roubo, inativa exemplar
    const causasResult = await queries.listarCausasPenalidade()
    const causaSelecionada = causasResult.rows.find(c => c.id === penalidade.causa_id)
    if (causaSelecionada && ['perda', 'roubo'].includes(causaSelecionada.nome.toLowerCase())) {
      await queries.inativarExemplar(penalidade.exemplar_codigo)
    }

    res.status(201).json(novaPenalidade)
  } catch (e) {
    res.status(500).json({ error: 'Erro ao adicionar penalidade' })
  }
}

async function patchPenalidade(req, res) {
  try {
    const { usuario_id, exemplar_codigo, emprestimo_data_inicio, data_aplicacao } = req.params
    const dados = req.body

    const atualizada = await queries.atualizarPenalidade(
      Number(usuario_id),
      exemplar_codigo,
      emprestimo_data_inicio,
      data_aplicacao,
      dados
    )

    if (!atualizada) {
      return res.status(404).json({ error: 'Penalidade não encontrada' })
    }
    res.json(atualizada)
  } catch (e) {
    res.status(500).json({ error: 'Erro ao atualizar penalidade' })
  }
}

async function deletePenalidade(req, res) {
  try {
    const { usuario_id, exemplar_codigo, emprestimo_data_inicio, data_aplicacao } = req.params
    await queries.removerPenalidade(Number(usuario_id), exemplar_codigo, emprestimo_data_inicio, data_aplicacao)
    res.status(204).end()
  } catch (e) {
    res.status(500).json({ error: 'Erro ao remover penalidade' })
  }
}

async function getUsuarios(req, res) {
  try {
    const result = await queries.listarUsuarios()
    res.json(result.rows)
  } catch (e) {
    res.status(500).json({ error: 'Erro ao buscar usuários' })
  }
}

async function getTipos(req, res) {
  try {
    const result = await queries.listarTiposPenalidade()
    res.json(result.rows)
  } catch (e) {
    res.status(500).json({ error: 'Erro ao buscar tipos' })
  }
}

async function getCausas(req, res) {
  try {
    const result = await queries.listarCausasPenalidade()
    res.json(result.rows)
  } catch (e) {
    res.status(500).json({ error: 'Erro ao buscar causas' })
  }
}

async function getEmprestimosUsuario(req, res) {
  try {
    const { usuario_id } = req.params
    const result = await queries.listarEmprestimosUsuario(Number(usuario_id))
    res.json(result.rows)
  } catch (e) {
    res.status(500).json({ error: 'Erro ao buscar empréstimos' })
  }
}

async function patchInativarExemplar(req, res) {
  try {
    const { exemplar_codigo } = req.params
    await queries.inativarExemplar(exemplar_codigo)
    res.status(204).end()
  } catch (e) {
    res.status(500).json({ error: 'Erro ao inativar exemplar' })
  }
}

module.exports = {
  getPenalidades,
  postPenalidade,
  patchPenalidade,
  deletePenalidade,
  getUsuarios,
  getTipos,
  getCausas,
  getEmprestimosUsuario,
  patchInativarExemplar,
}
