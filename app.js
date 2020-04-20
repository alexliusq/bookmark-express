const goodReadsKey = require('./config/keys').goodReadsKey;

const goodreads = require('goodreads-api-node');
const grClient = goodreads(goodReadsKey);

const bookManager = require('./models/books');


// console.log(grClient);

async function addBook(bookID) {
  let data = await grClient.showBook(bookID);
  let { book } = data;
  return book;
  // let res = await bookManager.createBookWithGoodreads(book);
  // console.log(res);
}

addBook(82120)
  .then(res => console.log(JSON.stringify(res)));