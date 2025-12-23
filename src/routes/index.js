const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  res.render('index', {
    title: 'Обзор',
    // сюда можно позже передавать суммарные показатели, виджеты и т.п.
  });
});

module.exports = router;
