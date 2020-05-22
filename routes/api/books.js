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

router.post('/goodreads/:id', async (req, res) => {
  try {
    const { book } = await grClient.showBook(req.params.id);
    console.log(book);
    
    const bookID = await Books.createBookWithGoodreads(book);
    res.json({ bookID });
  } catch (errors) {
    res.json(errors);
  }
});

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
