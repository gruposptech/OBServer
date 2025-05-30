var racksModel = require('../models/racksModel');

function buscarRacksPorEmpresa(req, res) {
	var idUsuario = req.params.idUsuario;
	racksModel
		.buscarRacksPorEmpresa(idUsuario)
		.then((resultado) => {
			if (resultado.length > 0) {
				res.status(200).json(resultado);
			} else {
				res.status(204).json([]);
			}
		})
		.catch((erro) => {
			console.log(erro);
			console.log('Houve um erro ao buscar os racks: ', erro.sqlMessage);
			res.status(500).json(erro.sqlMessage);
		});
}

module.exports = {
	buscarRacksPorEmpresa,
};
