let db = require('./db');
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

/*
kind: 'highlight',
    end: 1080,
    bookline: 'The Worldly Philosophers (Heilbroner, Robert L.)',
    language: 'en',
    author: 'Heilbroner, Robert L.',
    text: 'In a sense the vision of Adam Smith is a testimony to the '
    statusline: 'Your Highlight on Location 1077-1080 | ' +
      'Added on Saturday, February 15, 2020 ' +
      '1:19:41 AM',
    title: 'The Worldly Philosophers',
    begin: 1077,
    time: '2020-02-15 01:19:41',
    ordernr: 8363,
    page: null
  }
*/

async function addCalibreAnnotation(calibreAnnotation) {
  let {
    kind, bookline, title, author, language, begin, end,
    time, text, statusline, ordernr, page
  } = calibreAnnotation;

  let book_id = await getBookID(title);
  if (!book_id) console.log('Error could not find book to link annotations to');

  const { rows } = await db.query(SQL`
    INSERT INTO kindle_annotations
      (book_id, kind, bookline, title, author, language, begin, "end",
        time, text, statusline, ordernr, page)
    VALUES
      (${book_id}, ${kind}, ${bookline}, ${title}, ${author}, ${language},
        ${begin}, ${end}, ${time}, ${text}, ${statusline}, ${ordernr}, ${page}
      )  ;
  `);

  return rows[0].id;
}

async function getBookID(title) {
  let { rows } = await db.query(SQL`
    SELECT id FROM books WHERE title = ${title}
  `);

  if(!rows) return null;
  
  return rows[0].id;
}

async function createBookWithCalibre(calibreMetaData) {
  let { 
    identifiers, title, author_sort_map
  } = calibreMetaData;

  let { isbn } = identifiers;


  try {
    const authorIDs = await Promise.all(Object.keys(author_sort_map).map( author => {
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
  let res = await db.query(SQL`
  INSERT INTO books (id, title, completed_bool, isbn)
  VALUES (DEFAULT, ${title}, false, ${isbn})
  `);
  return res;
}

async function insertCalibreAuthor(author, author_sort) {
  try {
    const { rows } = await db.query(SQL`
    INSERT INTO calibre_authors
      (author, author_sort)
    VALUES
      (${author}, ${author_sort})
    RETURNING id;
    `);
    return rows[0].id;
  } catch(err) {
    if (error.constraint === 'calibre_authors_author_key') {
      return null;
    }

    throw error;
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

  let {isbn, amazon} = identifiers;

  let res = await db.query(SQL`
  INSERT INTO calibre_metadata
    (isbn, amazon, title, series, publisher, pubdate, title_sort, comments, cover)
  VALUES
    (${isbn}, ${amazon}, ${title}, ${series}, ${publisher}, ${pubdate},
      ${title_sort}, ${comments}, ${cover})
  `);

  return res;
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

async function getAllBookDetails(limit = 100) {
  let { rows } = await db.query(SQL`
    SELECT * FROM books AS a
    LEFT JOIN  calibre_metadata AS b ON a.isbn = b.isbn
    LEFT JOIN goodreads_details AS c ON a.isbn = c.isbn13
    LIMIT ${limit}
  `);

  return res;
}

debugger;
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
  addCalibreAnnotation,
  getBookID
}