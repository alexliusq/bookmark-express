const goodReadsKey = require('./config/keys').goodReadsKey;

const goodreads = require('goodreads-api-node');
const grClient = goodreads(goodReadsKey);

const express = require('express');
const app = express();

const bookManager = require('./models/books');
// const { tempBookData } = require('./tempBookData');


// bookManager.createBookWithGoodreads(tempBookData[0])
//   .then(res => console.log(res));

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.get("/", (req, res) => {
  res.send("Hello World!");
});


const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));

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


