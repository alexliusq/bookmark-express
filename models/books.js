let db = require('./db');
console.log('hello');
// db.query('SELECT * FROM test').then(msg => console.log(msg.rows));
const fs = require('fs').promises;

async function initializeBooksDB() {
  let queryString = await fs.readFile("./bookmarker.sql", "utf-8");
  console.log('boo');
  let res = await db.query(queryString);
  console.log(res);
}

async function insertBook() {
  let title = '';
}

initializeBooksDB();
