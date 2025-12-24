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

router.get('/reports', (req, res) => {
  res.render('reports', {
    layout: 'main_public',
    title: 'Операционные отчеты',
  });
});

router.get('/terms', (req, res) => {
  res.render('terms', { title: 'Правила использования', layout: 'main_public' });
});


module.exports = router;
