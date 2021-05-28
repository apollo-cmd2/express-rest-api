const { Router } = require('express');
const userModel = require('../models/userModel');

const router = new Router();

router.get('/activation/:emailToken', async (req, res) => {
  const { emailToken } = req.params;
  const user = await userModel.findOne({ emailToken });

  if (user) {
    user.isVerified = true;
    user.emailToken = '';
    await user.save();
    return res.send('Аккаунт успешно активирован!');
  } else {
    return res.send('Неправильный токен для активации аккаунта!');
  }
});

module.exports = router;
