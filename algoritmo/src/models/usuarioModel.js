var database = require('../database/config');

function autenticar(cnpj, senha, email) {
	console.log(
		"ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ",
		cnpj,
		senha
	);

	var instrucaoSql = `
        SELECT idEmpresa, nomeEmpresa, cnpjEmpresa, senhaUsuario, nomeUsuario, emailUsuario, cargo FROM empresa 
				JOIN usuario ON fkEmpresa = idEmpresa
				WHERE cnpjEmpresa = '${cnpj}' AND emailUsuario = '${email}' AND senhaUsuario = '${senha}';
    `;
	console.log('Executando a instrução SQL: \n' + instrucaoSql);
	return database.executar(instrucaoSql);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function cadastrar(nome, cnpj, email, telefone, senha, codigo) {
	console.log(
		"ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():",
		nome,
		cnpj,
		email,
		telefone,
		senha,
		codigo
	);

	// Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
	//  e na ordem de inserção dos dados.
	var instrucaoSql = `
        INSERT INTO empresa (nomeEmpresa, cnpjEmpresa, emailEmpresa, telefoneEmpresa, senhaEmpresa, codigoCadastro) VALUES ('${nome}', '${cnpj}', '${email}', '${telefone}', '${senha}', '${codigo}');
    `;
	console.log('Executando a instrução SQL: \n' + instrucaoSql);
	return database.executar(instrucaoSql);
}

function pegarCodigosUsados() {
	var instrucaoSql = `
    SELECT codigoCadastro FROM usuario;
    `;

	console.log('Executando a instrução SQL: \n' + instrucaoSql);
	return database.executar(instrucaoSql);
}

function pegarIdEmpresa(codigo) {
	var instrucaoSql = `
	SELECT idEmpresa FROM empresa WHERE codigoCadastro = '${codigo}'
	`;
	console.log('Executando a instrução SQL: \n' + instrucaoSql);
	return database.executar(instrucaoSql);
}

function temUsuarioCadastrado(idEmpresa) {
	var instrucaoSql = `
	SELECT count(idUsuario) qtdFuncionarios FROM empresa JOIN usuario ON idEmpresa = fkEmpresa WHERE idEmpresa = ${idEmpresa}
	`;
	console.log('Executando a instrução SQL: \n' + instrucaoSql);
	return database.executar(instrucaoSql);
}

function cadastrarParametros(tempMinIdeal, tempMaxIdeal, umidadeMinIdeal, umidadeMaxIdeal, fkEmpresa) {
	var instrucaoSql = `
		INSERT INTO parametros (tempMinIdeal, tempMaxIdeal, umidadeMinIdeal, umidadeMaxIdeal, fkEmpresa) VALUES (${tempMinIdeal}, ${tempMaxIdeal}, ${umidadeMinIdeal}, ${umidadeMaxIdeal}, ${fkEmpresa})
	`;

	console.log('Executando a instrução SQL: \n' + instrucaoSql);
	return database.executar(instrucaoSql);
}

function pegarParametros(idEmpresa) {
	var instrucaoSql = `
		SELECT tempMinIdeal, tempMaxIdeal, umidadeMinIdeal, umidadeMaxIdeal FROM parametros JOIN empresa on fkEmpresa = ${idEmpresa}
	`;
	console.log('Executando a instrução SQL: \n' + instrucaoSql);
	return database.executar(instrucaoSql);
}

function atualizarParametrosSensores() {
	var instrucaoSql = `
		UPDATE sensor SET fkParametros = 1 WHERE fkRack = 1
	`;
	console.log('Executando a instrução SQL: \n' + instrucaoSql);
	return database.executar(instrucaoSql);
}

module.exports = {
	autenticar,
	cadastrar,
	pegarCodigosUsados,
	pegarIdEmpresa,
	temUsuarioCadastrado,
	cadastrarParametros,
	pegarParametros,
	atualizarParametrosSensores,
};
