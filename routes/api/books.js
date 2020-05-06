const express = require('express');

const router = express.Router();

const Books = require('../../models/books');
const { validateBookDetails } = require('../../validation/books');

async function addBook(bookID) {
  // let data = await grClient.showBook(bookID);
  // let { book } = data;

  let res = await Books.createBookWithGoodreads(book);
  console.log(res);
}

// let data;
// Books.getBookDetails(tempBookData[0].id)
//   .then(res => {
//     data = res
//     console.log(res);
//   });

router.get('/', (req, res) => {
  Books.getAllBookDetails()
    .then(bookResponse => {
      // console.log('yello');
      // console.log(books);
      res.json(bookResponse);
    })
    .catch(err =>
      res.status(404).json({ noBooksFound: 'No Books Found'}));
});

router.get('/:id', (req, res) => {
  Books.getBookDetails(req.params.id)
    .then(book => res.json(book))
    .catch(err => 
      res.status(404).json({ noBookFound: 'No Book With ID Found' }));
});

router.post('/goodreads', (req, res) => {
  console.log(req.body);
  let book = req.body.book;

  let { isValid, errors } = valididateBookInput(book);
  if (!isValid) {
    res.status(400).json(errors);
  }

  Books.createBookWithGoodreads(book);

  res.send(`Success, added book with ${book.id}`);
});

router.get('/calibre', (req, res) => {
  
})

module.exports = router;