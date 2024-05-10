const express = require('express');
const router = express.Router();

const isAuth = require('../../middleware/isAuth');

const userController = require('../../controller/User/user');

router.get('', isAuth, userController.getPublicUsers); 

router.get('/:id',isAuth, userController.getProfile);

router.put('',isAuth, userController.resetPassword);

router.put('/privacy',isAuth, userController.setPrivacy);

router.put('/:id',isAuth, userController.updateUser);

module.exports = router;