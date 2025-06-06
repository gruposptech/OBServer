var alertasModel = require('../models/alertasModel');

function cadastrarAlerta(req, res) {
	var idSensor = req.body.idSensorServer;
	var idLeitura = req.body.idLeituraServer;
	var tipoAlerta = req.body.tipoAlertaServer;
	var statusAlerta = 'Pendente'

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
      console.log('Erro ao cadastrar alerta: ', erro)
    });
}

module.exports = {
  cadastrarAlerta
}
