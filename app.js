const goodReadsKey = require('./config/keys').goodReadsKey;

const goodreads = require('goodreads-api-node');
const grClient = goodreads(goodReadsKey);


// console.log(grClient);

async function getBook(bookID) {
  let data = await grClient.showBook(bookID);
  console.log(data);
  let { book } = data;
  console.log(book);

}

getBook(375802);

