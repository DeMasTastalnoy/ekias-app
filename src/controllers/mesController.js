const db = require('../config/db');

module.exports = {
  // Список заказов
  async listOrders(req, res) {
    console.log('[HANDLER] listOrders called');

    try {
      const [orders] = await db.query(
        'SELECT * FROM mes_orders ORDER BY created_at DESC'
      );

      return res.render('mes/orders', {
        title: 'Заказы MES',
        orders,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).send('Ошибка при загрузке заказов');
    }
  },

  // Добавление нового заказа
  async createOrder(req, res) {
    const { order_number, product_name, quantity } = req.body;

    try {
      await db.query(
        'INSERT INTO mes_orders (order_number, product_name, quantity) VALUES (?, ?, ?)',
        [order_number, product_name, quantity]
      );

      return res.redirect('/mes/orders');
    } catch (err) {
      console.error(err);
      return res.status(500).send('Ошибка при добавлении заказа');
    }
  },

  // Факты по производству
  async listProductionFacts(req, res) {
    try {
      const [productionFacts] = await db.query(
        `SELECT f.*, o.order_number, o.product_name
         FROM mes_production_facts f
         JOIN mes_orders o ON f.order_id = o.id
         ORDER BY f.production_date DESC`
      );

      // заказы нужны для выпадающего списка в форме
      const [orders] = await db.query(
        'SELECT id, order_number, product_name FROM mes_orders ORDER BY created_at DESC'
      );

      return res.render('mes/production_facts', {
        title: 'Факты производства MES',
        productionFacts,
        orders,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).send('Ошибка при загрузке фактов производства');
    }
  },

  // Добавление нового факта производства
  async createProductionFact(req, res) {
    const { order_id, produced_quantity, production_date } = req.body;

    try {
      await db.query(
        'INSERT INTO mes_production_facts (order_id, produced_quantity, production_date) VALUES (?, ?, ?)',
        [order_id, produced_quantity, production_date]
      );

      return res.redirect('/mes/production-facts');
    } catch (err) {
      console.error(err);
      return res.status(500).send('Ошибка при добавлении факта производства');
    }
  },
};
