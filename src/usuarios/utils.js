function formatarEndereco(logradouro, numero, complemento, cep) {
  let endereco = `${logradouro}, ${numero}`;
  if (complemento) {
    endereco += ` - ${complemento}`;
  }
  endereco += `\n${cep}`;
  return endereco;
}

// utils.js
function formatarUsuario(usuario) {
  return {
    id: usuario.id,
    nome: usuario.nome,
    cpf: usuario.cpf,
    gmail: usuario.gmail, // Campo email/gmail deve estar correto
    telefone: usuario.telefone,
    status: usuario.status_regularidade === true || usuario.status_regularidade === 't' || usuario.status_regularidade === '1' ? 'Regular' : 'Bloqueado',
    address: formatarEndereco(
      usuario.logradouro, 
      usuario.numero, 
      usuario.complemento, 
      usuario.cep
    )
  };
}



module.exports = { formatarUsuario };
