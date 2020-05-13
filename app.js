const goodReadsKey = require('./config/keys').goodReadsKey;

const goodreads = require('goodreads-api-node');
const grClient = goodreads(goodReadsKey);

const express = require('express');
const app = express();

const books = require('./routes/api/books');
const annotations = require('./routes/api/annotations');
const tags = require('./routes/api/tags');

const bookManager = require('./models/books');
// const { tempBookData } = require('./tempBookData');


// bookManager.createBookWithGoodreads(tempBookData[0])
//   .then(res => console.log(res));

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use('/api/books', books);
app.use('/api/annotations', annotations);
app.use('/api/tags', tags);

app.get("/", (req, res) => {
  res.send("Hello World!");
});


const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));