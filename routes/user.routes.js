const { Router } = require('express');
const userController = require('../controllers/user.controller');

const router = new Router();

router.post('/user', userController.createUser);
router.get('/users', userController.getUsers);
router.post('/user/login', userController.loginUser);
router.delete('/user/delete/:userId', userController.deleteUser);
router.post('/user/rate/:orderId', userController.rateUser);
router.get('/user/comments/:userId', userController.getUserComments);

module.exports = router;
