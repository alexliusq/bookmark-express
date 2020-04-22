let db = require('./db');
console.log('hello');
// db.query('SELECT * FROM test').then(msg => console.log(msg.rows));
const fs = require('fs').promises;

const SQL = require('sql-template-strings');

const path = require('path');

const tempDataFile = path.resolve(__dirname, './bookmarker.sql');
const { tempBookData } = require('../tempBookData');

/* sql-template strings example
// postgres:
pg.query('SELECT author FROM books WHERE name = $1 AND author = $2', [book, author])
// is equivalent to
pg.query(SQL`SELECT author FROM books WHERE name = ${book} AND author = ${author}`)
*/

async function initializeBooksDB() {
  let queryString = await fs.readFile(tempDataFile, "utf-8");
  // console.log('boo');
  let res = await db.query(queryString);
  console.log(res);
}

function seedTempData() {
  tempBookData.forEach(book => createBookWithGoodreads(book));
}

async function dropBooksDB() {
  let query = "DROP TABLE books; DROP TABLE goodreads_details";
  let res = await db.query(query);
  console.log(res);
}

async function createBookWithGoodreads(book) {
  let {
    id, title, isbn13, kindle_asin, marketplace_id, image_url, language_code,
    publisher, publication_year, publication_month, publication_day, is_ebook,
    description
  } = book;

  let res = await db.query(SQL`
  INSERT INTO goodreads_details
    (id, title, isbn13, kindle_asin, marketplace_id, image_url, language_code,
      publisher, publication_year, publication_month, publication_day, is_ebook,
      description)
    VALUES
    (${id}, ${title}, ${isbn13}, ${kindle_asin}, ${marketplace_id}, ${image_url},
      ${language_code}, ${publisher}, ${publication_year}, ${publication_month}, ${publication_day},
      ${is_ebook}, ${description});
  `);

  let res2 = await db.query(SQL`
    INSERT INTO books
    (title, completed_bool, goodreads_details_id)
    VALUES
    (${title}, false, ${id});
    `);
  
  return {res, res2};
}

async function getBookDetails(goodreadsID) {
  let res = await db.query(SQL`
    SELECT * FROM goodreads_details WHERE id = ${goodreadsID}
  `);

  console.log(res);
  return res;
}

// let data = getBookDetails(82120);

module.exports = {
  initializeBooksDB,
  createBookWithGoodreads,
  dropBooksDB,
  getBookDetails
}