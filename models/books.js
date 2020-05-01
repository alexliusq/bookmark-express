let db = require('./db');
console.log('hello');
// db.query('SELECT * FROM test').then(msg => console.log(msg.rows));
const fs = require('fs').promises;

const SQL = require('sql-template-strings');

const path = require('path');

const tempDataFile = path.resolve(__dirname, './bookmarker.sql');

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

async function dropBooksDB() {
  let query = `DROP TABLE books, goodreads_details, kindle_annotations,
  calibre_authors, calibre_authors_books, calibre_metadata
  `;
  let res = await db.query(query);
  console.log(res);
}

async function createBookWithCalibre(calibreMetaData) {
  let { 
    identifiers, title, author_sort_map
  } = calibreMetaData;

  let { isbn } = identifiers;

  try {
    await Promise.all(Object.keys(author_sort_map).map( author => {
      return insertCalibreAuthor(author, author_sort_map[author]);
    }));
    
    let res = await insertBook(title, isbn);
    let res2 = await insertCalibreMetadata(calibreMetaData);
    let res3 = await Promise.all(
      Object.keys(author_sort_map).map(author => 
        linkBookToAuthor(isbn, author)
      ));
    return {res, res2, res3};
  } catch(err) {
    console.log(err);
  }
}

async function insertBook(title, isbn) {
  let res = db.query(SQL`
  INSERT INTO books (id, title, completed_bool, isbn)
  VALUES (DEFAULT, ${title}, false, ${isbn})
  `);
  return res;
}

async function insertCalibreAuthor(author, author_sort) {
  let res = db.query(SQL`
  INSERT INTO calibre_authors
    (author, author_sort)
  VALUES
    (${author}, ${author_sort});
  `);

  return res;
}

async function insertCalibreMetadata(calibreMetaData) {
  let { 
    identifiers, cover, title, series, publisher,
    pubdate, title_sort, comments
  } = calibreMetaData;

  pubdate = pubdate.split("T")[0];

  let {isbn, amazon} = identifiers;

  let res = db.query(SQL`
  INSERT INTO calibre_metadata
    (isbn, amazon, title, series, publisher, pubdate, title_sort, comments, cover)
  VALUES
    (${isbn}, ${amazon}, ${title}, ${series}, ${publisher}, ${pubdate},
      ${title_sort}, ${comments}, ${cover});
  `);

  return res;
}

async function linkBookToAuthor(isbn, author) {

  let res = db.query(SQL`
  INSERT INTO calibre_authors_books (author_id, book_id)
  VALUES 
    ((
      SELECT id FROM calibre_authors WHERE
      author = ${author}
    ),
    (
      SELECT id FROM calibre_metadata WHERE
      isbn = ${isbn}
    ));
  `);

  return res;
}

  

async function createBookWithGoodreads(book) {
  let {
    id, title, isbn13, kindle_asin, marketplace_id, image_url, language_code,
    publisher, publication_year, publication_month, publication_day, is_ebook,
    description
  } = book;

  try {
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

    let res2 = await insertBook(title, isbn);
    let res3 = await linkGoodreads(isbn);
    return {res, res2, res3};

  } catch(err) {
    console.log(err);
  }
}

async function linkGoodreads() {
  let res = db.query(SQL`
  UPDATE
    books
  SET
    a.goodreads_details_id = b.id,
  FROM
    books AS a
    INNER JOIN goodreads_details AS b
      ON a.isbn = b.isbn
  WHERE
    a.isbn = ${isbn} AND
    b.isbn = ${isbn};
  `);

  return res;
}

async function getBookDetails(goodreadsID) {
  let res = db.query(SQL`
    SELECT * FROM goodreads_details WHERE id = ${goodreadsID}
  `);

  console.log(res);
  return res.rows;
}

async function getAllBookDetails(limit = 20) {
  let res = db.query(SQL`
    SELECT * FROM goodreads_details LIMIT ${limit}
  `);

  return res.rows;
}

// let data = getBookDetails(82120);

module.exports = {
  initializeBooksDB,
  createBookWithGoodreads,
  dropBooksDB,
  getBookDetails,
  getAllBookDetails,
  createBookWithCalibre,
}