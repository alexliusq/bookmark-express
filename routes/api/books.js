const express = require('express');

const router = express.Router();

const bookManager = require('../../models/books');
const { validateBookDetails } = require('../../validation/books');

async function addBook(bookID) {
  // let data = await grClient.showBook(bookID);
  // let { book } = data;

  let res = await bookManager.createBookWithGoodreads(book);
  console.log(res);
}

// let data;
// bookManager.getBookDetails(tempBookData[0].id)
//   .then(res => {
//     data = res
//     console.log(res);
//   });

router.get('/', (req, res) => {
  bookManager.getAllBookDetails()
    .then(books => res.json(books))
    .catch(err =>
      res.status(404).json({ noBooksFound: 'No Books Found'}));
});

router.get('/:id', (req, res) => {
  bookManager.getBookDetails(req.params.id)
    .then(book => res.json(book))
    .catch(err => 
      res.status(404).json({ noBookFound: 'No Book With ID Found' }));
});

router.post('/', (req, res) => {
  console.log(req.body);
  let book = req.body.book;

  let { isValid, errors } = valididateBookInput(book);
  if (!isValid) {
    res.status(400).json(errors);
  }

  bookManager.createBookWithGoodreads(book);

  res.send(`Success, added book with ${book.id}`);
})

module.exports = router;