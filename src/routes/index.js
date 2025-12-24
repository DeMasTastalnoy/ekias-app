const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  return res.render('index', {
    layout: 'main_public',
    title: 'Портал трансформации',
    news: []
  });
});

router.get('/about', (req, res) => {
  return res.render('about', {
    layout: 'main_public',
    title: 'О проекте'
  });
});

module.exports = router;
