var express = require('express');
var router = express.Router();
var Auth = require('../authentication')
var UserTypes = require('../../shared/usertypes');

//Require controller
var authController = require('../controllers/authentication.controller');

router.post("/login", authController.login);

router.post("/verifyToken", authController.verfiyToken);

module.exports = router;