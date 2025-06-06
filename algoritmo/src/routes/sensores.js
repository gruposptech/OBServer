var express = require('express');
var router = express.Router();

var sensoresController = require('../controllers/sensoresController');

router.get('/sensoresInativos/:idEmpresa', (req, res) => {
	sensoresController.sensoresInativos(req, res);
});

router.get('/totalSensores/:idEmpresa', (req, res) => {
	sensoresController.totalSensores(req, res);
});

module.exports = router;
