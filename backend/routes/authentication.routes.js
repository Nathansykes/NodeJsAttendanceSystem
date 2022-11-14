var express = require('express');
var router = express.Router();

//Require controller
var authController = require('../controllers/authentication.controller');

router.post("/login", authController.login);

router.post("/verifyToken", authController.verfiyToken);

module.exports = router;