const express = require('express');
const router = express.Router();

const isAdmin= require('../../middleware/isAdmin');

const userTypeController = require('../../controller/UserType/userType');

router.post('', isAdmin, userTypeController.addUserType);

module.exports = router;