var sensoresModel = require('../models/sensoresModel');

function sensoresInativos(req, res) {
	var idEmpresa = req.params.idEmpresa;

	sensoresModel
		.sensoresInativos(idEmpresa)
		.then((resultado) => {
			if (resultado.length > 0) {
				res.status(200).json(resultado);
			} else {
				res.status(204).json([]);
			}
		})
		.catch((erro) => {
			console.log(erro);
			console.log('Houve um erro ao buscar os sensores inativos: ', erro.sqlMessage);
			res.status(500).json(erro.sqlMessage);
		});
}
function totalSensores(req, res) {
	var idEmpresa = req.params.idEmpresa;

	sensoresModel
		.totalSensores(idEmpresa)
		.then((resultado) => {
			if (resultado.length > 0) {
				res.status(200).json(resultado);
			} else {
				res.status(204).json([]);
			}
		})
		.catch((erro) => {
			console.log(erro);
			console.log('Houve um erro ao buscar o total de sensores: ', erro.sqlMessage);
			res.status(500).json(erro.sqlMessage);
		});
}

module.exports = {
	sensoresInativos,
	totalSensores
};
