var leiturasModel = require('../models/leiturasModel');

function buscarUltimasLeiturasTemp(req, res) {
	const limiteLinhas = 10;

	var idRack = req.params.idRack;

	console.log(`Recuperando as últimas ${limiteLinhas} medidas`);

	leiturasModel
		.buscarUltimasLeiturasTemp(idRack, limiteLinhas)
		.then((resultado) => {
			if (resultado.length > 0) {
				res.status(200).json(resultado);
			} else {
				res.status(204).send('Nenhum resultado encontrado!');
			}
		})
		.catch((erro) => {
			console.log(erro);
			console.log('Houve um erro ao buscar as ultimas leitras.', erro.sqlMessage);
			res.status(500).json(erro.sqlMessage);
		});
}

function buscarLeiturasEmTempoRealTemp(req, res) {
	var idRack = req.params.idRack;

	console.log('Recuperando medidas em tempo real');

	leiturasModel
		.buscarLeiturasEmTempoRealTemp(idRack)
		.then((resultado) => {
			if (resultado.length > 0) {
				res.status(200).json(resultado);
			} else {
				res.status(204).send('Nenhum resultado encontrado!');
			}
		})
		.catch((erro) => {
			console.log(erro);
			console.log('Houve um erro ao buscar as leituras em tempo real.', erro.sqlMessage);
			res.status(500).json(erro.sqlMessage);
		});
}

function buscarUltimasLeiturasUmid(req, res) {
	const limiteLinhas = 10;

	var idRack = req.params.idRack;

	console.log(`Recuperando as últimas ${limiteLinhas} medidas`);

	leiturasModel
		.buscarUltimasLeiturasUmid(idRack, limiteLinhas)
		.then((resultado) => {
			if (resultado.length > 0) {
				res.status(200).json(resultado);
			} else {
				res.status(204).send('Nenhum resultado encontrado!');
			}
		})
		.catch((erro) => {
			console.log(erro);
			console.log('Houve um erro ao buscar as ultimas leitras.', erro.sqlMessage);
			res.status(500).json(erro.sqlMessage);
		});
}

function buscarLeiturasEmTempoRealUmid(req, res) {
	var idRack = req.params.idRack;

	console.log('Recuperando medidas em tempo real');

	leiturasModel
		.buscarLeiturasEmTempoRealUmid(idRack)
		.then((resultado) => {
			if (resultado.length > 0) {
				res.status(200).json(resultado);
			} else {
				res.status(204).send('Nenhum resultado encontrado!');
			}
		})
		.catch((erro) => {
			console.log(erro);
			console.log('Houve um erro ao buscar as leituras em tempo real.', erro.sqlMessage);
			res.status(500).json(erro.sqlMessage);
		});
}

function mockarTemp(req, res) {
	var idSensor = req.body.idSensor;
	var temperaturaMockada = req.body.temperaturaMockada;

	leiturasModel
		.mockarTemp(idSensor, temperaturaMockada)
		.then((resposta) => {
			res.status(200).json(resposta);
		})
		.catch((erro) => {
			res.status(500).json(erro);
		});
}

function mockarUmid(req, res) {
	var idSensor = req.body.idSensor;
	var umidadeMockada = req.body.umidadeMockada;

	leiturasModel
		.mockarUmid(idSensor, umidadeMockada)
		.then((resposta) => {
			res.status(200).json(resposta);
		})
		.catch((erro) => {
			res.status(500).json(erro);
		});
}

module.exports = {
	buscarUltimasLeiturasTemp,
	buscarLeiturasEmTempoRealTemp,
	buscarUltimasLeiturasUmid,
	buscarLeiturasEmTempoRealUmid,
	mockarTemp,
	mockarUmid
};
