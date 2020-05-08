let db = require('./db');
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

/*
async create(email, password) {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      const {rows} = await db.query(sql`
      INSERT INTO users (id, email, password)
        VALUES (${uuidv4()}, ${email}, ${hashedPassword})
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
    const {rows} = await db.query(sql`
    SELECT * FROM users WHERE email=${email} LIMIT 1;
    `);
    return rows[0];
  }
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
  const { 
    identifiers, title, author_sort_map
  } = calibreMetaData;

  const { isbn } = identifiers;


  try {
    const authorIDs = await Promise.all(Object.keys(author_sort_map).map( author => {
      return insertCalibreAuthor(author, author_sort_map[author]);
    }));
    
    const bookID = await insertBook(title, isbn);
    const calibreID = await insertCalibreMetadata(calibreMetaData);
    const res = await Promise.all(
      authorIDs.map(authorID => insertAuthorIDBookID(authorID, calibreID))
    );
    return calibreID;
  } catch(err) {
    console.log(err);
    throw(err);
  }
}

async function insertBook(title, isbn) {
  try {
    const {rows} = await db.query(SQL`
    INSERT INTO books
      (title, completed_bool, isbn)
    VALUES
      (${title}, false, ${isbn})
    ON CONFLICT (title)
    DO UPDATE SET title = EXCLUDED.title
    RETURNING id;
    `);
    return rows[0].id;
  } catch(err) {
    throw (err)
  }
}

async function insertCalibreAuthor(author, author_sort) {
  try {
    const { rows } = await db.query(SQL`
    INSERT INTO calibre_authors
      (author, author_sort)
    VALUES
      (${author}, ${author_sort})
    ON CONFLICT (author)
    DO UPDATE SET author = EXCLUDED.author
    RETURNING id;
    `);
    return rows[0].id;
  } catch(err) {
    throw err;
  }
}

/* error object
err: error: duplicate key value violates unique constraint "calibre_authors_author_key" at Connection.parseE (/Users/Alex/projects/bookmarker-express/node_modules/pg/lib/connection.js:600:48) at Connection.parseMessage (/Users/Alex/projects/bookmarker-express/node_modules/pg/lib/connection.js:399:19) at Socket.<anonymous> (/Users/Alex/projects/bookmarker-express/node_modules/pg/lib/connection.js:115:22) at Socket.emit (events.js:200:13) at addChunk (_stream_readable.js:294:12) at readableAddChunk (_stream_readable.js:275:11) at Socket.Readable.push (_stream_readable.js:210:10) at TCP.onStreamRead (internal/stream_base_commons.js:166:17)
code: "23505"
column: undefined
constraint: "calibre_authors_author_key"
dataType: undefined
detail: "Key (author)=(Stephen King) already exists."
file: "nbtinsert.c"
hint: undefined
internalPosition: undefined
internalQuery: undefined
length: 237
line: "570"
name: "error"
position: undefined
routine: "_bt_check_unique"
schema: "public"
severity: "ERROR"
table: "calibre_authors"
where: undefined
message: "duplicate key value violates unique constraint "calibre_authors_author_key""
stack: "error: duplicate key value violates unique constraint "calibre_authors_author_key"↵    at Connection.parseE (/Users/Alex/projects/bookmarker-express/node_modules/pg/lib/connection.js:600:48)↵    at Connection.parseMessage (/Users/Alex/projects/bookmarker-express/node_modules/pg/lib/connection.js:399:19)↵    at Socket.<anonymous> (/Users/Alex/projects/bookmarker-express/node_modules/pg/lib/connection.js:115:22)↵    at Socket.emit (events.js:200:13)↵    at addChunk (_stream_readable.js:294:12)↵    at readableAddChunk (_stream_readable.js:275:11)↵    at Socket.Readable.push (_stream_readable.js:210:10)↵    at TCP.onStreamRead (internal/stream_base_commons.js:166:17)"
__proto__: Object
*/

async function insertCalibreMetadata(calibreMetaData) {
  let { 
    identifiers, cover, title, series, publisher,
    pubdate, title_sort, comments
  } = calibreMetaData;

  pubdate = pubdate.split("T")[0];

  const {isbn, amazon} = identifiers;

  try {
    const {rows} = await db.query(SQL`
    INSERT INTO calibre_metadata
      (isbn, amazon, title, series, publisher, pubdate, title_sort, comments, cover)
    VALUES
      (${isbn}, ${amazon}, ${title}, ${series}, ${publisher}, ${pubdate},
        ${title_sort}, ${comments}, ${cover})
    ON CONFLICT (isbn)
    DO UPDATE SET isbn = EXCLUDED.isbn
    RETURNING id;
    `);
  
    return rows[0].id;
  } catch (err) {
    throw(err);
  }
}


async function insertAuthorIDBookID(authorID, bookID) {
  try {
    const {rows} = await db.query(SQL`
    INSERT INTO calibre_authors_books (author_id, book_id)
    VALUES (${authorID}, ${bookID})
    ON CONFLICT (author_id, book_id)
    DO UPDATE SET book_id = EXCLUDED.book_id
    RETURNING author_id, book_id;
    `);
    return rows[0].id 
  } catch(err) {
    throw(err);
  }
}

async function linkBookToAuthor(isbn, author) {

  let res = await db.query(SQL`
  INSERT INTO calibre_authors_books (author_id, book_id)
  VALUES 
    ((
      SELECT id FROM calibre_authors WHERE
      author = ${author}
    ),
    (
      SELECT id FROM calibre_metadata WHERE
      isbn = ${isbn}
    ))
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
        ${is_ebook}, ${description})
    `);

    let res2 = await insertBook(title, isbn);
    let res3 = await linkGoodreads(isbn);
    return {res, res2, res3};

  } catch(err) {
    console.log(err);
  }
}

async function linkGoodreads() {
  let res = await db.query(SQL`
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
    b.isbn = ${isbn}
  `);

  return res;
}

async function getBookDetails(goodreadsID) {
  let res = await db.query(SQL`
    SELECT * FROM goodreads_details WHERE id = ${goodreadsID}
  `);

  console.log(res);
  return res.rows;
} 

async function getAllBookDetails(limit = 50) {
  const {rows} = await db.query(SQL`
    SELECT a.id, a.title, a.completed_bool, a.isbn, b.publisher, 
    TO_CHAR(b.pubdate, 'yyyy-mm-dd') AS pubdate, b.comments, b.series
    FROM books AS a
    LEFT JOIN  calibre_metadata AS b ON a.isbn = b.isbn
    LEFT JOIN goodreads_details AS c ON a.isbn = c.isbn13
    LIMIT ${limit}
  `);

  return rows;
}

async function getBookID(title) {
  const { rows } = await db.query(SQL`
    SELECT id FROM books WHERE title = ${title}
  `);

  if(!rows[0]) return null;
  
  return rows[0].id;
}

// debugger;

// async function testInsertAuthor(author_sort_map) {
//   const authorIDs = await Promise.all(Object.keys(author_sort_map).map( author => {
//     return insertCalibreAuthor(author, author_sort_map[author]);
//   }));
//   console.log(authorIDs);
//   return authorIDs; 
// }
// let ids;
// testInsertAuthor({'bob':'bob', 'bob1':'bob1'}).then(authors => ids = authors);

// insertCalibreAuthor('bob');

// let data = getBookDetails(82120);
// getBookDetails('How to ')

module.exports = {
  initializeBooksDB,
  createBookWithGoodreads,
  dropBooksDB,
  getBookDetails,
  getAllBookDetails,
  createBookWithCalibre,
  getBookID,
  insertBook,
}