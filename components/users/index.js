var express = require('express');
var router = express.Router();

const userController = require('./usersController');

router.get('/manage_users_account', userController.LoadUsers)

router.get("/edit_user_profile",userController.EditUsersAccount)

router.get("/block",userController.Block)


module.exports = router;