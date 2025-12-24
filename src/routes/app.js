const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('app/index', { title: 'EKIAS — Модули' }); // layout main (с sidebar)
});

module.exports = router;
