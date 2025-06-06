var database = require('../database/config');

function buscarRacksPorEmpresa(idUsuario) {
	var instrucaoSql = `SELECT * FROM rack WHERE fkEmpresa = ${idUsuario}`;

	console.log('Executando a instrução SQL: \n' + instrucaoSql);
	return database.executar(instrucaoSql);
}

module.exports = {
  buscarRacksPorEmpresa
}
