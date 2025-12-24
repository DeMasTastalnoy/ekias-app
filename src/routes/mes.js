const express = require('express');
const router = express.Router();
const mesController = require('../controllers/mesController');

// Главная MES (лендинг модуля)
router.get('/', (req, res) => {
  res.render('mes/index', {
    title: 'MES — Производство',
  });
});


// Заказы
router.get('/orders', mesController.listOrders);
router.post('/orders', mesController.createOrder);

// Факты производства
router.get('/production-facts', mesController.listProductionFacts);
router.post('/production-facts', mesController.createProductionFact);
router.post('/orders/:id/status', mesController.updateOrderStatus);

module.exports = router;
