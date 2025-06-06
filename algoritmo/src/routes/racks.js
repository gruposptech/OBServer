var express = require('express');
var router = express.Router();

var racksController = require('../controllers/racksController');

router.get('/:idEmpresa', (req, res) => {
	racksController.buscarRacksPorEmpresa(req, res);
});

module.exports = router;
