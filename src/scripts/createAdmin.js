require('dotenv').config();
const bcrypt = require('bcryptjs');
const db = require('../config/db');

(async () => {
  const email = process.argv[2];
  const password = process.argv[3];

  if (!email || !password) {
    console.log('Usage: node src/scripts/createAdmin.js admin@company.ru StrongPass123!');
    process.exit(1);
  }

  const hash = await bcrypt.hash(password, 12);

  await db.query(
    `INSERT INTO users (role, email, password_hash, first_name, last_name)
     VALUES ('admin', ?, ?, 'Admin', 'EKIAS')
     ON DUPLICATE KEY UPDATE password_hash = VALUES(password_hash), role='admin'`,
    [email, hash]
  );

  console.log('Admin created/updated:', email);
  process.exit(0);
})();
