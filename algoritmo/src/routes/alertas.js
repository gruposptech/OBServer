var express = require('express');
var router = express.Router();

var alertasController = require('../controllers/alertasController');

router.post('/cadastrarAlerta', (req, res) => {
  alertasController.cadastrarAlerta(req, res);
});

module.exports = router;
