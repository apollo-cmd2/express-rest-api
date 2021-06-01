const { Router } = require('express');
const rolesController = require('../controllers/roles.controller');

const router = new Router();

router.post('/roles', rolesController.addRole);
router.get('/roles', rolesController.getRoles);

module.exports = router;
