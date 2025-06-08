var database = require('../database/config');

function cadastrarAlerta(idSensor, idLeitura, tipoAlerta, statusAlerta) {
	var instrucaoSql = `
      INSERT INTO alerta (fkSensor, fkLeitura, tipoAlerta, statusAlerta) VALUES (${idSensor}, ${idLeitura}, '${tipoAlerta}', '${statusAlerta}');
    `;

	console.log('Executando a instrução SQL: \n' + instrucaoSql);
	return database.executar(instrucaoSql);
}

function historicoAlertas(idEmpresa) {
	var instrucaoSql = `
		select s.nomeSensor,
		r.descricao,
    CASE 
    WHEN a.tipoAlerta LIKE '%Temperatura%' AND a.tipoAlerta NOT LIKE '%Umidade%'THEN concat(l.temperatura, '°C')
    WHEN a.tipoAlerta LIKE '%Umidade%' AND a.tipoAlerta NOT LIKE '%Temperatura%' THEN concat(l.umidade,'%')
    ELSE concat(l.temperatura, '°C e ', l.umidade, '%')
    END AS 'Medida',
    a.tipoAlerta,
    l.dataHoraLeitura,
		a.idAlerta,
		a.statusAlerta
	 from alerta a 
		join leitura l on a.fkLeitura = l.idLeitura
			join sensor s on s.idSensor = l.fkSensor
				join rack r on r.idRack = s.fkRack
					join parametros p on s.fkParametros = p.idParams
						join empresa e on e.idEmpresa = p.fkEmpresa
							where idEmpresa = ${idEmpresa}
								order by l.dataHoraLeitura desc;
	`;

	console.log('Executando a instrução SQL: \n' + instrucaoSql);
	return database.executar(instrucaoSql);
}

function atualizarAlerta(idAlerta, statusAlerta) {
	var instrucaoSql = `
		UPDATE alerta SET statusAlerta = '${statusAlerta}' WHERE idAlerta = '${idAlerta}'
	`;

	console.log('Executando a instrução SQL: \n' + instrucaoSql);
	return database.executar(instrucaoSql);
}

module.exports = {
	cadastrarAlerta,
	historicoAlertas,
	atualizarAlerta,
};
