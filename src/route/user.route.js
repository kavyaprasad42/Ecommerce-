const express = require('express')
const router = express.Router();
const UserController = require('../controller/user.controller');
router.get('/login',UserController.showLogin)
router.post('/login',UserController.login)
router.get('/register',UserController.showAddUser)
router.post('/register', UserController.create)
router.get('/secure',UserController.verifyToken, UserController.showSecureRoute)

module.exports = router;
