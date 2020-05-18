const SQL = require('sql-template-strings');
const bcrypt = require('bcrypt');
const db = require('./db');

module.exports = {
  async create(email, password) {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      const { rows } = await db.query(SQL`
      INSERT INTO users (email, password)
        VALUES (${email}, ${hashedPassword})
        RETURNING id, email;
      `);

      const [user] = rows;
      return user;
    } catch (error) {
      if (error.constraint === 'users_email_key') {
        return null;
      }
      throw error;
    }
  },
  async find(email) {
    const { rows } = await db.query(SQL`
    SELECT id, email, password FROM users WHERE email=${email} LIMIT 1;
    `);
    return rows[0];
  },
};
