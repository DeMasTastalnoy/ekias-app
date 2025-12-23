const express = require('express');
const router = express.Router();
const mesController = require('../controllers/mesController');

// Заказы
router.get('/orders', mesController.listOrders);
router.post('/orders', mesController.createOrder);

// Факты производства
router.get('/production-facts', mesController.listProductionFacts);
router.post('/production-facts', mesController.createProductionFact);

module.exports = router;
