const express = require('express');
const router = express.Router();
const financeController = require('../controllers/financeController');

router.get('/budgets', financeController.listBudgets);
router.post('/budgets', financeController.createBudget);

router.get('/', (req, res) => {
  res.render('finance/index', { title: 'ERP — Финансы' });
});

module.exports = router;
