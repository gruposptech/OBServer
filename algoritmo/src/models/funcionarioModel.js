var database = require('../database/config');

// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function cadastrar(nomeUser, emailUser, senhaUser, cargoUser, idEmpresa) {
	var instrucaoSql = `
        INSERT INTO usuario (fkEmpresa, nomeUsuario, emailUsuario, senhaUsuario, cargo) VALUES ('${idEmpresa}', '${nomeUser}', '${emailUser}', '${senhaUser}', '${cargoUser}');
    `;
	console.log('Executando a instrução SQL: \n' + instrucaoSql);
	return database.executar(instrucaoSql);
}

module.exports = {
	cadastrar,
};
