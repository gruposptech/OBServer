// var ambiente_processo = 'producao';
var ambiente_processo = 'desenvolvimento';

var caminho_env = ambiente_processo === 'producao' ? '.env' : '.env.dev';
// Acima, temos o uso do operador ternário para definir o caminho do arquivo .env
// A sintaxe do operador ternário é: condição ? valor_se_verdadeiro : valor_se_falso

require('dotenv').config({ path: caminho_env });

var express = require('express');
var cors = require('cors');
var path = require('path');
var PORTA_APP = process.env.APP_PORT;
var HOST_APP = process.env.APP_HOST;

var app = express();
var indexRouter = require('./src/routes/index');
var usuarioRouter = require('./src/routes/usuarios');
var funcionarioRouter = require('./src/routes/funcionario');
var racksRouter = require('./src/routes/racks');
var sensoresRouter = require('./src/routes/sensores');
var leiturasRouter = require('./src/routes/leituras');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public'), { index: 'inicial.html' }));

app.use(cors());

app.use('/', indexRouter);
app.use('/usuarios', usuarioRouter);
app.use('/funcionario', funcionarioRouter);
app.use('/racks', racksRouter);
app.use('/sensores', sensoresRouter);
app.use('/leituras', leiturasRouter);

app.listen(PORTA_APP, function () {
	console.log(` 
    Servidor do seu site já está rodando! Acesse o caminho a seguir para visualizar .: http://${HOST_APP}:${PORTA_APP} :. \n\n
    Você está rodando sua aplicação em ambiente de .:${process.env.AMBIENTE_PROCESSO}:.\n\n`);
});
