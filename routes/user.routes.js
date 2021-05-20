const Router = require('express');
const userController = require('../controllers/user.controller');

const router = new Router();

router.post('/user', userController.createUser);
router.post('/user/login', userController.loginUser);

module.exports = router;
