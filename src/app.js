const path = require('path');
console.log('RUNNING FILE:', __filename);
console.log('CWD:', process.cwd());
console.log('VIEWS DIR SHOULD BE:', path.join(__dirname, 'views'));

const express = require('express');
const exphbs = require('express-handlebars');

const indexRoutes = require('./routes/index');
const mesRoutes = require('./routes/mes');
const financeRoutes = require('./routes/finance');
// сюда же позже добавишь scmRoutes, hrRoutes, biRoutes

const app = express();

app.use((req, res, next) => {
  console.log('[REQ]', req.method, req.originalUrl);
  next();
});


// Парсинг форм
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Папка для статики (CSS, JS, картинки)
app.use(express.static(path.join(__dirname, '..', 'public')));

// Handlebars
const hbs = exphbs.create({
  extname: '.hbs',
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, 'views', 'layouts'),
  partialsDir: path.join(__dirname, 'views', 'partials'),
  helpers: {
    eq: (a, b) => a === b,
  },
});

app.engine('hbs', hbs.engine);

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Роуты
app.use('/mes', mesRoutes);
app.use('/finance', financeRoutes);

app.use('/', indexRoutes);

// app.use('/scm', scmRoutes);
// app.use('/hr', hrRoutes);
// app.use('/bi', biRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`EKIAS app running on http://localhost:${PORT}`);
});
