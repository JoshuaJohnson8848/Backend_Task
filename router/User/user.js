const express = require('express');
const router = express.Router();

const isAuth = require('../../middleware/isAuth');

const userController = require('../../controller/User/user');

router.get('/:id',isAuth, userController.getProfile);

module.exports = router;