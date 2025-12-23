const db = require('../config/db');

module.exports = {
  // Список заказов
  async listOrders(req, res) {
    try {
      const [orders] = await db.query('SELECT * FROM mes_orders ORDER BY created_at DESC');
      res.render('mes/orders', { title: 'Заказы MES', orders });
    } catch (err) {
      console.error(err);
      res.status(500).send('Ошибка при загрузке заказов');
    }
  },

  // Добавление нового заказа
  async createOrder(req, res) {
    const { order_number, product_name, quantity } = req.body;

    try {
      await db.query('INSERT INTO mes_orders (order_number, product_name, quantity) VALUES (?, ?, ?)', [order_number, product_name, quantity]);
      res.redirect('/mes/orders');
    } catch (err) {
      console.error(err);
      res.status(500).send('Ошибка при добавлении заказа');
    }
  },

  // Факты по производству
  async listProductionFacts(req, res) {
    try {
      const [productionFacts] = await db.query('SELECT * FROM mes_production_facts JOIN mes_orders ON mes_production_facts.order_id = mes_orders.id ORDER BY production_date DESC');
      res.render('mes/production_facts', { title: 'Факты производства MES', productionFacts });
    } catch (err) {
      console.error(err);
      res.status(500).send('Ошибка при загрузке фактов производства');
    }
  },

  // Добавление нового факта производства
  async createProductionFact(req, res) {
    const { order_id, produced_quantity, production_date } = req.body;

    try {
      await db.query('INSERT INTO mes_production_facts (order_id, produced_quantity, production_date) VALUES (?, ?, ?)', [order_id, produced_quantity, production_date]);
      res.redirect('/mes/production-facts');
    } catch (err) {
      console.error(err);
      res.status(500).send('Ошибка при добавлении факта производства');
    }
  }
};
