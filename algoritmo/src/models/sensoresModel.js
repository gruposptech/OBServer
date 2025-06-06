var database = require('../database/config');

function sensoresInativos(idEmpresa) {
	var instrucaoSql = `
 SELECT s.nomeSensor, r.descricao FROM sensor s
  JOIN rack r ON r.idRack = s.fkRack
  JOIN empresa e ON r.fkEmpresa = e.idEmpresa
  WHERE s.statusSensor = 'inativo' and e.idEmpresa = ${idEmpresa};`;

	console.log('Executando a instrução SQL: \n' + instrucaoSql);
	return database.executar(instrucaoSql);
}

function totalSensores(idEmpresa) {
	var instrucaoSql = `
  SELECT count(*) FROM sensor s
  JOIN rack r ON r.idRack = s.fkRack
  JOIN empresa e on r.fkEmpresa = e.idEmpresa
  WHERE e.idEmpresa = ${idEmpresa};`;

  console.log('Executando a instrução SQL: \n' + instrucaoSql);
	return database.executar(instrucaoSql);
}

module.exports = {
	sensoresInativos,
  totalSensores
};
