var express = require('express');
var router = express.Router();

var funcionarioController = require('../controllers/funcionarioController');

router.post('/cadastrar/:idEmpresa', (req, res) => {
	funcionarioController.cadastrar(req, res);
});

module.exports = router;
