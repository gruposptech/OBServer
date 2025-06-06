var database = require('../database/config');

function cadastrarAlerta(idSensor, idLeitura, tipoAlerta, statusAlerta) {
	var instrucaoSql = `
      INSERT INTO alerta (fkSensor, fkLeitura, tipoAlerta, statusAlerta) VALUES (${idSensor}, ${idLeitura}, '${tipoAlerta}', '${statusAlerta}');
    `;

	console.log('Executando a instrução SQL: \n' + instrucaoSql);
	return database.executar(instrucaoSql);
}

module.exports = {
	cadastrarAlerta,
};
