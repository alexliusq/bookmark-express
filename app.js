const goodReadsKey = require('./config/keys').goodReadsKey;

const goodreads = require('goodreads-api-node');
const grClient = goodreads(goodReadsKey);

const bookManager = require('./models/books');
const { tempBookData } = require('./tempBookData');

// console.log(tempBookData);
// console.log(grClient);

bookManager.createBookWithGoodreads(tempBookData[0])
  .then(res => console.log(res));

async function addBook(bookID) {
  // let data = await grClient.showBook(bookID);
  // let { book } = data;

  let res = await bookManager.createBookWithGoodreads(book);
  console.log(res);
}

// addBook(82120)

let data;
bookManager.getBookDetails(tempBookData[0].id)
  .then(res => {
    data = res
    console.log(res);
  });

debugger
