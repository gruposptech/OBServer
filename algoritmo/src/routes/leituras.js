var express = require('express');
var router = express.Router();

var leituraController = require('../controllers/leiturasController');

router.get('/ultimasTemp/:idRack', function (req, res) {
	leituraController.buscarUltimasLeiturasTemp(req, res);
});

router.get('/tempo-realTemp/:idRack', function (req, res) {
	leituraController.buscarLeiturasEmTempoRealTemp(req, res);
});

router.get('/ultimasUmid/:idRack', function (req, res) {
	leituraController.buscarUltimasLeiturasUmid(req, res);
});

router.get('/tempo-realUmid/:idRack', function (req, res) {
	leituraController.buscarLeiturasEmTempoRealUmid(req, res);
});

router.post('/mockarTemp', function (req, res) {
	leituraController.mockarTemp(req, res);
});

router.post('/mockarUmid', function (req, res) {
	leituraController.mockarUmid(req, res);
});

module.exports = router;
