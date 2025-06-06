var usuarioModel = require('../models/usuarioModel');
var racksModel = require('../models/racksModel');

function autenticar(req, res) {
	var cnpj = req.body.cnpjServer;
	var senha = req.body.senhaServer;
	var email = req.body.emailServer;

	if (cnpj == undefined) {
		res.status(400).send('Seu cnpj está undefined!');
	} else if (senha == undefined) {
		res.status(400).send('Sua senha está indefinida!');
	} else if (email == undefined) {
		res.status(400).send('Seu email está undefined!');
	} else {
		usuarioModel
			.autenticar(cnpj, senha, email)
			.then(function (resultadoAutenticar) {
				console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
				console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

				if (resultadoAutenticar.length == 1) {
					console.log(resultadoAutenticar);

					racksModel.buscarRacksPorEmpresa(resultadoAutenticar[0].idEmpresa).then((resultadoRacks) => {
						if (resultadoRacks.length > 0) {
							res.json({
								id: resultadoAutenticar[0].idEmpresa,
								cnpj: resultadoAutenticar[0].cnpjEmpresa,
								nomeEmpresa: resultadoAutenticar[0].nomeEmpresa,
								nomeFuncionario: resultadoAutenticar[0].nomeUsuario,
								emailFuncionario: resultadoAutenticar[0].emailUsuario,
								cargoFuncionario: resultadoAutenticar[0].cargo,
								senha: resultadoAutenticar[0].senhaUsuario,
								racks: resultadoRacks,
							});
						} else {
							res.status(204).json({ racks: [] });
						}
					});
				} else if (resultadoAutenticar.length == 0) {
					res.status(403).send('Email e/ou senha inválido(s)');
				} else {
					res.status(403).send('Mais de um usuário com o mesmo login e senha!');
				}
			})
			.catch(function (erro) {
				console.log(erro);
				console.log('\nHouve um erro ao realizar o login! Erro: ', erro.sqlMessage);
				res.status(500).json(erro.sqlMessage);
			});
	}
}

function cadastrar(req, res) {
	// Crie uma variável que vá recuperar os valores do arquivo cadastro.html
	var nome = req.body.nomeServer;
	var cnpj = req.body.cnpjServer;
	var email = req.body.emailServer;
	var telefone = req.body.telefoneServer;
	var senha = req.body.senhaServer;
	var codigo = req.body.codigoServer;

	// Faça as validações dos valores
	if (nome == undefined) {
		res.status(400).send('Seu nome está undefined!');
	} else if (email == undefined) {
		res.status(400).send('Seu email está undefined!');
	} else if (senha == undefined) {
		res.status(400).send('Sua senha está undefined!');
	} else if (cnpj == undefined) {
		res.status(400).send('Seu cnpj está undefined!');
	} else if (telefone == undefined) {
		res.status(400).send('Seu telefone está undefined!');
	} else if (codigo == undefined) {
		res.status(400).send('Seu código está undefined!');
	} else {
		// Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
		usuarioModel
			.cadastrar(nome, cnpj, email, telefone, senha, codigo)
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

function pegarCodigosUsados(req, res) {
	usuarioModel
		.pegarCodigosUsados()
		.then((resultado) => {
			res.status(200).json(resultado);
		})
		.catch((erro) => {
			console.log(erro);
			res.status(500).json(erro.sqlMessage);
		});
}

function pegarIdEmpresa(req, res) {
	var codigo = req.params.codigo;
 
	usuarioModel
		.pegarIdEmpresa(codigo)
		.then((resultado) => {
			res.status(200).json(resultado);
		})
		.catch((erro) => {
			console.log(erro);
			res.status(500).json(erro.sqlMessage);
		});
}

function temUsuarioCadastrado(req, res) {
	var idEmpresa = req.params.idEmpresa;

	usuarioModel
		.temUsuarioCadastrado(idEmpresa)
		.then((resultado) => {
			res.status(200).json(resultado);
		})
		.catch((erro) => {
			console.log(erro);
			res.status(500).json(erro.sqlMessage);
		});
}

function cadastrarParametros(req, res) {
	var idEmpresa = req.body.idEmpresaServer;
	var tempMinIdeal = req.body.tempMinIdealServer;
	var tempMaxIdeal = req.body.tempMaxIdealServer;
	var umidadeMinIdeal = req.body.umidadeMinIdealServer;
	var umidadeMaxIdeal = req.body.umidadeMaxIdealServer;

	usuarioModel
		.cadastrarParametros(tempMinIdeal, tempMaxIdeal, umidadeMinIdeal, umidadeMaxIdeal, idEmpresa)
		.then((resultado) => {
			res.json(resultado);
		})
		.catch((erro) => {
			console.log(erro);
			res.status(500).json(erro.sqlMessage);
		});
}

function pegarParametros(req, res) {
	var idEmpresa = req.params.idEmpresa;

	usuarioModel
		.pegarParametros(idEmpresa)
		.then((resultado) => {
			res.status(200).json(resultado);
		})
		.catch((erro) => {
			res.status(500).json(erro.sqlMessage);
		});
}

module.exports = {
	autenticar,
	cadastrar,
	pegarCodigosUsados,
	pegarIdEmpresa,
	temUsuarioCadastrado,
	cadastrarParametros,
	pegarParametros,
};
