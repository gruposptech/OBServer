var express = require('express');
var router = express.Router();

var alertasController = require('../controllers/alertasController');

router.post('/cadastrarAlerta', (req, res) => {
	alertasController.cadastrarAlerta(req, res);
});

router.get('/historicoAlertas/:idEmpresa', (req, res) => {
	alertasController.historicoAlertas(req, res);
});

router.put('/atualizarAlerta', (req, res) => {
	alertasController.atualizarAlerta(req, res);
});

module.exports = router;
