var database = require('../database/config');

function sensoresInativos(idEmpresa) {
	var instrucaoSql = `
  SELECT s.nomeSensor, r.descricao FROM sensor s
  JOIN rack r ON r.idRack = s.fkRack
  JOIN empresa e ON r.fkEmpresa = ${idEmpresa}
  WHERE s.statusSensor = 'inativo';`;

	console.log('Executando a instrução SQL: \n' + instrucaoSql);
	return database.executar(instrucaoSql);
}

function totalSensores(idEmpresa) {
	var instrucaoSql = `
  SELECT count(*) FROM sensor s
  JOIN rack r ON r.idRack = s.fkRack
  JOIN empresa e ON r.fkEmpresa = ${idEmpresa};`;

  console.log('Executando a instrução SQL: \n' + instrucaoSql);
	return database.executar(instrucaoSql);
}

module.exports = {
	sensoresInativos,
  totalSensores
};
