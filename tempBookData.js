const goodReadsKey = require('./config/keys').goodReadsKey;

const goodreads = require('goodreads-api-node');
const grClient = goodreads(goodReadsKey);
// console.log(grClient);

const fsPromise = require('fs').promises;
const fs = require('fs');
const booksDB = require('./models/books');
const validateBookDetails = require('./validation/books');

let bookIDs = [82120, 45186565, 38357895];

const tempBookData = readTempBookData();
const tempAnnotations = readAnnotations();
const tempCalibreMetadata = readCalibreMetaData();


async function getData(bookIDs) {
  let tempBookData = await Promise.all(
    bookIDs.map(id => {
      return grClient.showBook(id);
    })
  );
  // console.log(tempBookData);
  return tempBookData.map(req => req.book);
}

async function saveData(data) {
  let json = JSON.stringify(data);
  await fsPromise.writeFile('temp_book_data.json', json, 'utf8');
  console.log('success');
}

function readTempBookData() {
  let data = fs.readFileSync('temp_book_data.json', 'utf8');
  let json = JSON.parse(data);
  // console.log(json);
  return json;
}

function readCalibreMetaData() {
  let data = fs.readFileSync('../kindle-export/metadata.calibre');
  let json = JSON.parse(data);
  return json;
}

function readAnnotations() {
  let data = fs.readFileSync('../kindle-export/json_output/clippings_2020-05-02.json');
  let json = JSON.parse(data);
  return json;
}

function addAllMetadata() {
  tempCalibreMetadata.forEach(book => {
    book.isbn = book.identifiers.isbn || "";
    if(validateBookDetails(book).isValid) {
      booksDB.createBookWithCalibre(book)
        .catch(err => console.log(err));
    }
  });
}

function addAnnotations() {
  // tempAnnotations
}

// getData(bookIDs).then(data => saveData(data));

function getBookAnnotations(title) {
  return tempAnnotations.filter(anno => {
    let re = new RegExp(title, "i");
    return re.test(anno.bookline);
  })
}

function getBookMetadata(title) {
  return tempCalibreMetadata.filter(book => {
    let re = new RegExp(title, "i");
    return re.test(book.title);
  })
}

// addAllMetadata();
debugger;
getBookMetadata('How to Get Filthy Rich')
  .forEach(book => {
    book.isbn = book.identifiers.isbn || "";
    if(validateBookDetails(book).isValid) {
      booksDB.createBookWithCalibre(book)
        .catch(err => console.log(err));
    }
  })

// getBookAnnotations('How to Get Filthy Rich')
//   .forEach(anno => booksDB.addCalibreAnnotation(anno));

// console.loggetBookAnnotations('The Worldly Philosophers')

// booksDB.createBookWithCalibre(tempCalibreMetadata[3]).catch(err => console.log(err));

module.exports = {
  tempBookData,
  tempAnnotations, 
  tempCalibreMetadata,
  getBookAnnotations,
  getBookMetadata
}
