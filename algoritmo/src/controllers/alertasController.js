var alertasModel = require('../models/alertasModel');

function cadastrarAlerta(req, res) {
	var idSensor = req.body.idSensorServer;
	var idLeitura = req.body.idLeituraServer;
	var tipoAlerta = req.body.tipoAlertaServer;
	var statusAlerta = 'Pendente';

	alertasModel
		.cadastrarAlerta(idSensor, idLeitura, tipoAlerta, statusAlerta)
		.then((resultado) => {
			if (resultado.length > 0) {
				res.status(200).json(resultado);
			} else {
				res.status(204).send('Nenhum resultado encontrado!');
			}
		})
		.catch((erro) => {
			console.log('Erro ao cadastrar alerta: ', erro);
		});
}

function historicoAlertas(req, res) {
	var idEmpresa = req.params.idEmpresa;
	alertasModel
		.historicoAlertas(idEmpresa)
		.then((resultado) => {
			if (resultado.length > 0) {
				res.status(200).json(resultado);
			} else {
				res.status(204).send('Nenhum resultado encontrado!');
			}
		})
		.catch((erro) => {
			console.log('Erro ao pegar o historico de alertas: ', erro);
		});
}

function atualizarAlerta(req, res) {
	var idAlerta = req.body.idAlerta;
	var novoStatus = req.body.status;

	if (idAlerta == undefined) {
		res.status(400).send('O idAlerta está undefined!');
	} else if (novoStatus == undefined) {
		res.status(400).send('O novoStatus está undefined!');
	} else {
		alertasModel
			.atualizarAlerta(idAlerta, novoStatus)
			.then((resposta) => {
				res.status(200).json(resposta);
			})
			.catch((erro) => {
				console.log('Erro ao atualizar o alerta: ', erro.sqlMessage);
			});
	}
}

module.exports = {
	cadastrarAlerta,
	historicoAlertas,
	atualizarAlerta,
};
