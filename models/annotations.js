let db = require('./db');
const fs = require('fs').promises;

const SQL = require('sql-template-strings');
const path = require('path');
const tempDataFile = path.resolve(__dirname, './bookmarker.sql');

const annotationsQueryTemplate = SQL`
SELECT book_id, kind, bookline, title, author, language, begin,
"end", TO_CHAR(time,  'yyyy-mm-dd-hh-mi-ss'), text, ordernr, page)
FROM kindle_annotations`;

async function getAnnotationsByBookTitle(title) {
  const book_id = await getBookID(title);
  const rows = await getAnnotationsByBookID(book_id);
  return rows;
}

async function getAnnotationsByBookID(book_id) {
  const query = annotationsQueryTemplate
    .append(SQL`WHERE book_id = ${book_id}`);

  const {rows} = await db.query(query);
  return rows;
}

async function getAnnotationsByID(annoID) {
  const query = annotationsQueryTemplate
    .append(SQL`WHERE id = ${annoID}`);
  
  const {rows} = await db.query(query);
  return rows;
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
      (id, book_id, kind, bookline, title, author, language, begin, "end",
        time, text, statusline, page)
    VALUES
      (${ordernr}, ${book_id}, ${kind}, ${bookline}, ${title}, ${author}, ${language},
        ${begin}, ${end}, ${time}, ${text}, ${statusline}, ${page}
      )
    ON CONFLICT (statusline)
    DO UPDATE set statusline = EXCLUDED.statusline
    RETURNING id;
  `);

  return rows[0].id;
}

async function getBookID(title) {
  const { rows } = await db.query(SQL`
    SELECT id FROM books WHERE title = ${title}
  `);

  if(!rows[0]) return null;
  
  return rows[0].id;
}

module.exports = {
  addCalibreAnnotation,
  getBookID
}