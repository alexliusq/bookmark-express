const goodReadsKey = require('./config/keys').goodReadsKey;

const goodreads = require('goodreads-api-node');
const grClient = goodreads(goodReadsKey);
// console.log(grClient);

const fsPromise = require('fs').promises;
const fs = require('fs');

let bookIDs = [82120, 45186565, 38357895];

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

function readTempData() {
  let data = fs.readFileSync('temp_book_data.json', 'utf8');
  let json = JSON.parse(data);
  // console.log(json);
  return json;
}

// getData(bookIDs).then(data => saveData(data));

module.exports = {
  tempBookData: readTempData()
}
