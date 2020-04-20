const goodReadsKey = require('./config/keys').goodReadsKey;

const goodreads = require('goodreads-api-node');
const grClient = goodreads(goodReadsKey);
// console.log(grClient);

const fs = require('fs').promises;

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
  await fs.writeFile('temp_book_data.json', json, 'utf8');
  console.log('success');
}

async function readTempData() {
  let data = await fs.readFile('temp_book_data.json', 'utf8');
  let json = JSON.parse(data);
  return json;
}

// getData(bookIDs).then(data => saveData(data));


module.exports = {
  readTempData
};
