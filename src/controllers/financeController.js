const db = require('../config/db');

module.exports = {
  async listBudgets(req, res) {
    try {
      const [rows] = await db.query(
        'SELECT * FROM erp_budgets ORDER BY year DESC, department ASC'
      );
      res.render('finance/budgets', {
        title: 'Бюджеты',
        budgets: rows
      });
    } catch (err) {
      console.error(err);
      res.status(500).send('Ошибка при загрузке бюджетов');
    }
  },

  async createBudget(req, res) {
    const { name, department, year, amount_planned } = req.body;

    try {
      await db.query(
        'INSERT INTO erp_budgets (name, department, year, amount_planned) VALUES (?, ?, ?, ?)',
        [name, department, year, amount_planned]
      );
      res.redirect('/finance/budgets');
    } catch (err) {
      console.error(err);
      res.status(500).send('Ошибка при создании бюджета');
    }
  }
};
