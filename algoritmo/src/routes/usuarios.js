var express = require('express');
var router = express.Router();

var usuarioController = require('../controllers/usuarioController');

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post('/cadastrar', function (req, res) {
	usuarioController.cadastrar(req, res);
});

router.post('/autenticar', function (req, res) {
	usuarioController.autenticar(req, res);
});

router.get('/pegarCodigosUsados', function (req, res) {
	usuarioController.pegarCodigosUsados(req, res);
});

router.get('/pegarIdEmpresa/:codigo', function (req, res) {
	usuarioController.pegarIdEmpresa(req, res);
});

router.get('/temUsuarioCadastrado/:idEmpresa', (req, res) => {
	usuarioController.temUsuarioCadastrado(req, res);
});

router.post('/cadastrarParametros', (req, res) => {
	usuarioController.cadastrarParametros(req, res);
});

router.get('/pegarParametros/:idEmpresa', (req, res) => {
	usuarioController.pegarParametros(req, res);
});

module.exports = router;
