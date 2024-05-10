const express = require('express');
const router = express.Router();

const authController = require('../../controller/Auth/auth');

router.post('', authController.login);

router.post('/login', authController.googleLogin);

router.post('/signup', authController.signup);

router.post('/googlesignup', authController.googleSignup);

module.exports = router;