var database = require('../database/config');

// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function cadastrar(nomeUser, emailUser, senhaUser, cargoUser, idEmpresa, codigoCadastro) {
	var instrucaoSql = `
        INSERT INTO usuario (fkEmpresa, nomeUsuario, emailUsuario, senhaUsuario, cargo, codigoCadastro) VALUES ('${idEmpresa}', '${nomeUser}', '${emailUser}', '${senhaUser}', '${cargoUser}', '${codigoCadastro}');
    `;
	console.log('Executando a instrução SQL: \n' + instrucaoSql);
	return database.executar(instrucaoSql);
}

module.exports = {
	cadastrar,
};
