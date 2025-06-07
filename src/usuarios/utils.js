function formatarEndereco(logradouro, numero, complemento, cep) {
  let endereco = `${logradouro}, ${numero}`;
  if (complemento) {
    endereco += ` - ${complemento}`;
  }
  endereco += `\n${cep}`;
  return endereco;
}

function formatarUsuario(usuario) {
  return {
    id: usuario.id,
    nome: usuario.nome,
    gmail: usuario.gmail,
    telefone: usuario.telefone,
    status: usuario.status ? 'Regular' : 'Bloqueado',
    cpf: parseInt(usuario.cpf),
    address: formatarEndereco(
      usuario.logradouro,
      usuario.numero,
      usuario.complemento,
      usuario.cep
    ),
  };
}

module.exports = { formatarUsuario };
