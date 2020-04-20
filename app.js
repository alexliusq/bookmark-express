const goodReadsKey = require('./config/keys').goodReadsKey;

const goodreads = require('goodreads-api-node');
const grClient = goodreads(goodReadsKey);

const bookManager = require('./models/books');
const tempBookData = require('./tempBookData');


// console.log(grClient);

async function addBook(bookID) {
  // let data = await grClient.showBook(bookID);
  // let { book } = data;

  let res = await bookManager.createBookWithGoodreads(book);
  console.log(res);
}

// addBook(82120)
