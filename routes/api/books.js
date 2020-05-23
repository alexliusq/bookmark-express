const express = require('express');

const router = express.Router();

const Books = require('../../models/books');
const Annotations = require('../../models/annotations');
const { validateBookDetails } = require('../../validation/books');

const goodreads = require('goodreads-api-node');
const { goodreadsKey } = require('../../config/keys');

const grClient = goodreads(goodreadsKey);

async function addBook(bookID) {
  // let data = await grClient.showBook(bookID);
  // let { book } = data;

  const res = await Books.createBookWithGoodreads(book);
  console.log(res);
}

// let data;
// Books.getBookDetails(tempBookData[0].id)
//   .then(res => {
//     data = res
//     console.log(res);
//   });
async function addGoodreadsBook(req, res) {
  try {
    console.log('yello2');
    const isbn = req.isbn ? req.isbn : req.params.id;
    console.log(isbn);
    const { book } = await grClient.showBook(isbn);
    console.log(book);
    
    const createdBook = await Books.createBookWithGoodreads(book);
    res.json(createdBook);
  } catch (errors) {
    res.json(errors);
  }
}

router.post('/isbn/:isbn', async (req, res, next) => {
  try {
    console.log('yello');
    const goodreadsRes = await grClient.searchBooks({ q: req.params.isbn });
    req.isbn = goodreadsRes.search.results.work.best_book.id._;
    console.log(req.isbn);
    next();
  } catch (errors) {
    res.json({ errors, explain: 'likely isbn not found on goodreads'});
  }
}, addGoodreadsBook);

router.post('/goodreads/:id', addGoodreadsBook);

router.get('/', async (req, res) => {
  try {
    let books = await Books.getAllBookDetails();
    books = await Promise.all(books.map(book => Annotations.addAnnotationCountForBook(book)));
    res.json(books);
  } catch (errors) {
    res.status(404).json({ errors, noBooksFound: 'No Books Found' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    let book = await Books.getBookDetails(req.params.id);
    book = await Annotations.addAnnotationCountForBook(book);
    res.json(book);
  } catch (errors) {
    res.status(404).json({ errors, noBookFound: 'No Book With ID Found' });
  }
});

// router.post('/goodreads', (req, res) => {
//   console.log(req.body);
//   const { book } = req.body;

//   const { isValid, errors } = valididateBookInput(book);
//   if (!isValid) {
//     res.status(400).json(errors);
//   }

//   Books.createBookWithGoodreads(book);

//   res.send(`Success, added book with ${book.id}`);
// });

// router.get('/calibre', (req, res) => {

// });

module.exports = router;
