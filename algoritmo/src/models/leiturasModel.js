var database = require('../database/config');

function buscarUltimasLeiturasTemp(idRack, limiteLinhas) {
	var instrucaoSql = `
    SELECT
    temperatura, 
    dataHoraLeitura, 
    DATE_FORMAT(dataHoraLeitura, '%H:%i:%s') as data_grafico 
    FROM leitura l
    JOIN sensor s ON l.fkSensor = s.idSensor
    JOIN rack r ON s.fkRack = r.idRack
    WHERE r.idRack = ${idRack}
    ORDER BY l.idLeitura DESC LIMIT ${limiteLinhas};
  `;

	console.log('Executando a instrução SQL: \n' + instrucaoSql);
	return database.executar(instrucaoSql);
}

function buscarLeiturasEmTempoRealTemp(idRack) {
	var instrucaoSql = `
    SELECT
    temperatura, 
    dataHoraLeitura, 
    DATE_FORMAT(dataHoraLeitura, '%H:%i:%s') as data_grafico ,
    fkRack
    FROM leitura l
    JOIN sensor s ON l.fkSensor = s.idSensor
    JOIN rack r ON s.fkRack = r.idRack
    WHERE r.idRack = ${idRack}
    ORDER BY l.idLeitura DESC LIMIT 1;
  `;

	console.log('Executando a instrução SQL: \n' + instrucaoSql);
	return database.executar(instrucaoSql);
}

function buscarUltimasLeiturasUmid(idRack, limiteLinhas) {
	var instrucaoSql = `
    SELECT
    umidade, 
    dataHoraLeitura, 
    DATE_FORMAT(dataHoraLeitura, '%H:%i:%s') as data_grafico 
    FROM leitura l
    JOIN sensor s ON l.fkSensor = s.idSensor
    JOIN rack r ON s.fkRack = r.idRack
    WHERE r.idRack = ${idRack}
    ORDER BY l.idLeitura DESC LIMIT ${limiteLinhas};
  `;

	console.log('Executando a instrução SQL: \n' + instrucaoSql);
	return database.executar(instrucaoSql);
}

function buscarLeiturasEmTempoRealUmid(idRack) {
	var instrucaoSql = `
    SELECT
    umidade, 
    dataHoraLeitura, 
    DATE_FORMAT(dataHoraLeitura, '%H:%i:%s') as data_grafico ,
    fkRack
    FROM leitura l
    JOIN sensor s ON l.fkSensor = s.idSensor
    JOIN rack r ON s.fkRack = r.idRack
    WHERE r.idRack = ${idRack}
    ORDER BY l.idLeitura DESC LIMIT 1;
  `;

	console.log('Executando a instrução SQL: \n' + instrucaoSql);
	return database.executar(instrucaoSql);
}

module.exports = {
	buscarUltimasLeiturasTemp,
	buscarLeiturasEmTempoRealTemp,
	buscarUltimasLeiturasUmid,
	buscarLeiturasEmTempoRealUmid,
};
