let db = require('./db');
console.log('hello');
// db.query('SELECT * FROM test').then(msg => console.log(msg.rows));
const fs = require('fs').promises;

const SQL = require('sql-template-strings');

/* sql-template strings example
// postgres:
pg.query('SELECT author FROM books WHERE name = $1 AND author = $2', [book, author])
// is equivalent to
pg.query(SQL`SELECT author FROM books WHERE name = ${book} AND author = ${author}`)
*/

async function initializeBooksDB() {
  let queryString = await fs.readFile("./bookmarker.sql", "utf-8");
  console.log('boo');
  let res = await db.query(queryString);
  console.log(res);
}

async function createBookWithGoodreads(book) {
  let {
    id, title, isbn13, kindle_asin, marketplace_id, image_url, language_code,
    publisher, publication_year, publication_month, publication_day, is_ebook,
    description
  } = book;

  let res = await db.query(SQL`
    INSERT INTO books
    (id, title, isbn13, kindle_asin, marketplace_id, image_url, language_code,
      publisher, publication_year, publication_month, publication_day, is_ebook,
      description)
    VALUES
    (${id}, ${title}, ${isbn13}, ${kindle_asin}, ${marketplace_id}, ${image_url},
      ${language_code}, ${publisher}, ${publication_year}, ${publication_month}, ${publication_day},
      ${is_ebook}, ${description})
  `);
}

module.exports = {
  initializeBooksDB,
  createBookWithGoodreads
}