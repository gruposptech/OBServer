var funcionarioModel = require('../models/funcionarioModel');

function cadastrar(req, res) {
	console.log('Body: ', req.body)
	console.log('Params: ', req.params)
	console.log('Query: ', req.query)
	// Crie uma variável que vá recuperar os valores do arquivo cadastro.html
	var nomeUser = req.body.nomeUserServer;
	var emailUser = req.body.emailUserServer;
	var senhaUser = req.body.senhaUserServer;
	var cargoUser = req.body.cargoUserServer;
	var idEmpresa = req.params.idEmpresa;
	var codigoCadastro = req.body.codigoCadastroServer;

	// Faça as validações dos valores
	if (nomeUser == undefined) {
		res.status(400).send('Seu nome está undefined!');
	} else if (emailUser == undefined) {
		res.status(400).send('Seu email está undefined!');
	} else if (senhaUser == undefined) {
		res.status(400).send('Sua senha está undefined!');
	} else if (cargoUser == undefined) {
		res.status(400).send('Seu cargo está undefined!');
	} else if (codigoCadastro == undefined) {
		res.status(400).send('Seu código de cadastro está undefined!');
	} else {
		// Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
		funcionarioModel
			.cadastrar(nomeUser, emailUser, senhaUser, cargoUser, idEmpresa, codigoCadastro)
			.then(function (resultado) {
				res.json(resultado);
			})
			.catch(function (erro) {
				console.log(erro);
				console.log('\nHouve um erro ao realizar o cadastro! Erro: ', erro.sqlMessage);
				res.status(500).json(erro.sqlMessage);
			});
	}
}

module.exports = {
	cadastrar,
};
