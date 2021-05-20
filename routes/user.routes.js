const Router  = require('express');
const userController = require('../controllers/user.controller')

const router = new Router();

router.post('/user', userController.createUser);


module.exports = router