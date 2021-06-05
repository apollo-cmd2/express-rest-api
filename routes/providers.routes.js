const ProvidersController = require('../controllers/providers.controller');

const router = require('express').Router();


router.post('/providers', ProvidersController.createProvider);
router.get('/providers', ProvidersController.getProviders);
router.put('/providers/:id', ProvidersController.updateProvider);
router.delete('/providers/:id', ProvidersController.deleteProvider);

module.exports = router;

