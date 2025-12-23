const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');

const indexRoutes = require('./routes/index');
const mesRoutes = require('./routes/mes');
const financeRoutes = require('./routes/finance');
// сюда же позже добавишь scmRoutes, hrRoutes, biRoutes

const app = express();

// Парсинг форм
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Папка для статики (CSS, JS, картинки)
app.use(express.static(path.join(__dirname, '..', 'public')));

// Handlebars
app.engine(
  'hbs',
  exphbs.engine({
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'views', 'layouts'),
    partialsDir: path.join(__dirname, 'views', 'partials')
  })
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Роуты
app.use('/', indexRoutes);
app.use('/mes', mesRoutes);
app.use('/finance', financeRoutes);
// app.use('/scm', scmRoutes);
// app.use('/hr', hrRoutes);
// app.use('/bi', biRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`EKIAS app running on http://localhost:${PORT}`);
});
