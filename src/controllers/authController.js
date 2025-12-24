const bcrypt = require('bcryptjs');
const db = require('../config/db');

module.exports = {
  getLogin(req, res) {
    res.render('auth/login', { title: 'Вход', layout: 'main_public' });
  },

  async postLogin(req, res) {
    const { email, password } = req.body;

    const [rows] = await db.query(
      'SELECT id, role, email, password_hash, first_name, last_name, is_active FROM users WHERE email = ? LIMIT 1',
      [email]
    );

    if (!rows.length) {
      return res.status(401).render('auth/login', { title: 'Вход', layout: 'main_public', error: 'Неверный email или пароль' });
    }

    const user = rows[0];
    if (!user.is_active) {
      return res.status(403).render('auth/login', { title: 'Вход', layout: 'main_public', error: 'Аккаунт отключён' });
    }

    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) {
      return res.status(401).render('auth/login', { title: 'Вход', layout: 'main_public', error: 'Неверный email или пароль' });
    }

    req.session.user = {
      id: user.id,
      role: user.role,
      email: user.email,
      name: `${user.first_name || ''} ${user.last_name || ''}`.trim()
    };

    // admin -> /app, employee -> / (или /app тоже если хочешь)
    return res.redirect(user.role === 'admin' ? '/app' : '/');
  },

  getRegister(req, res) {
    res.render('auth/register', { title: 'Регистрация', layout: 'main_public' });
  },

  async postRegister(req, res) {
    const { first_name, last_name, email, department, position, password, password2, accept } = req.body;

    if (!accept) {
      return res.status(400).render('auth/register', { title: 'Регистрация', layout: 'main_public', error: 'Нужно принять правила использования' });
    }
//    if (!password || password.length < 6) {
//      return res.status(400).render('auth/register', { title: 'Регистрация', layout: 'main_public', error: 'Пароль должен быть минимум 6 символов' });
//    }
    if (password !== password2) {
      return res.status(400).render('auth/register', { title: 'Регистрация', layout: 'main_public', error: 'Пароли не совпадают' });
    }

    // домен (как на скрине). если не нужен — убери
    if (!email.endsWith('@promholding.ru')) {
      return res.status(400).render('auth/register', { title: 'Регистрация', layout: 'main_public', error: 'Используйте корпоративную почту @promholding.ru' });
    }

    const [exists] = await db.query('SELECT id FROM users WHERE email=? LIMIT 1', [email]);
    if (exists.length) {
      return res.status(409).render('auth/register', { title: 'Регистрация', layout: 'main_public', error: 'Пользователь с таким email уже существует' });
    }

    const hash = await bcrypt.hash(password, 12);

    await db.query(
      `INSERT INTO users (role, first_name, last_name, email, department, position, password_hash)
       VALUES ('employee', ?, ?, ?, ?, ?, ?)`,
      [first_name, last_name, email, department, position, hash]
    );

    return res.redirect('/auth/login');
  },

  logout(req, res) {
    req.session.destroy(() => res.redirect('/'));
  }
};
