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

debugger;
// addAllMetadata();


// getBookMetadata('How to Get Filthy Rich')
//   .forEach(book => {
//     book.isbn = book.identifiers.isbn || "";
//     if(validateBookDetails(book).isValid) {
//       debugger;
//       booksDB.createBookWithCalibre(book)
//         .catch(err => console.log(err));
//     }
//   })

booksDB.getAllBookDetails().then(res => console.log(res));
// getBookAnnotations('How to Get Filthy Rich')
//   .forEach((anno, idx)=> {
//    booksDB.addCalibreAnnotation(anno);
//   });



// console.loggetBookAnnotations('The Worldly Philosophers')

// booksDB.createBookWithCalibre(tempCalibreMetadata[3]).catch(err => console.log(err));

/*
application_id: 233
author_link_map: {Mohsin Hamid: ""}
author_sort: "Hamid, Mohsin"
author_sort_map: {Mohsin Hamid: "Hamid, Mohsin"}
authors: ["Mohsin Hamid"]
book_producer: null
comments: "<div><p><em>"Mr. Hamid reaffirms his place as one of his generation's most inventive and gifted writers." –Michiko Kakutani, <em>The New York Times</em><br></em></p><p><em>"A globalized version of <em>The Great Gatsby </em>. . . [Hamid's] book is nearly that good." –Alan Cheuse, NPR<br></em></p><p><em>"Marvelous and moving." –<em>TIME Magazine</em><br></em></p><p><em>From the internationally bestselling author of <em>The Reluctant Fundamentalist</em>, the boldly imagined tale of a poor boy’s quest for wealth and love . . .<em><br></em></em></p><p><em><em>His first two novels established Mohsin Hamid as a radically inventive storyteller with his finger on the world’s pulse. <em>How to Get Filthy Rich in Rising Asia</em> meets that reputation—and exceeds it. The astonishing and riveting tale of a man’s journey from impoverished rural boy to corporate tycoon, it steals its shape from the business self-help books devoured by ambitious youths all over “rising Asia.” It follows its nameless hero to the sprawling metropolis where he begins to amass an empire built on that most fluid, and increasingly scarce, of goods: water. Yet his heart remains set on something else, on the pretty girl whose star rises along with his, their paths crossing and recrossing, a lifelong affair sparked and snuffed and sparked again by the forces that careen their fates along.<br><em>How to Get Filthy Rich in Rising Asia </em>is a striking slice of contemporary life at a time of crushing upheaval. Romantic without being sentimental, political without being didactic, and spiritual without being religious, it brings an unflinching gaze to the violence and hope it depicts. And it creates two unforgettable characters who find moments of transcendent intimacy in the midst of shattering change.</em></em></p><h3><em><em>Amazon.com Review</em></em></h3><h4><em><em>Amazon Guest Review of “How to Get Filthy Rich in Rising Asia,” by Mohsin Hamid</em></em></h4><p><em><em>By Nell Freudenberger</em></em></p><p><em><em><strong>Nell Freudenberger is the author of, <em>The Newlyweds</em> and <em>Lucky Girls</em>.</strong></em></em></p><p><em><em>I was at a party the other night, when the man standing next to me said, "Where is the next great novel in the second person" (Will someone PLEASE start inviting me to some better parties?) As it turned out, I had an answer without even thinking about it, since I had just finished Mohsin Hamid's extraordinary <em>How To Get Filthy Rich in Rising Asia</em>.</em></em></p><p><em><em>This is the kind of novel with a conceit that any writer would envy: the book's structure mimics that of the cheap self-help books sold at sidewalk stands all over South Asia, alongside computer manuals and test-prep textbooks. Each chapter begins with a rule--"Work for Yourself," "Don't Fall in Love," "Be Prepared to Use Violence"--and expertly evolves into a narrative.</em></em></p><p><em><em>In precise, notably unsentimental prose, Hamid tells the story of an unnamed boy who moves from a village to a city. Hamid's decision not to name his character or his new home (which feels like Lahore, but could be any number of South Asian cities) is part of what makes the book so urgent and contemporary. "At each subsequent wonder you think you have arrived, that surely nothing could belong more to your destination than this, and each time you are proven wrong until you cease thinking and simply surrender to the layers of marvels and visions washing over you." This boy's journey is part of an enormous migration that is one of the great twenty-first-century stories, and yet Hamid makes it feel intimate and individual: a saucer-eyed kid in the dark on the back of a truck. </em></em></p><p><em><em><em>How To Get Filthy Rich in Rising Asia</em> is a love story as much as a success story, and the opposition of its hero's twin passions gives the book a propulsive intensity. I found myself unable to do anything else until I finished it, and I don't think there's a reader on earth who could help wanting Hamid's hero to succeed--both in business and in his pursuit of "the pretty girl" whom he has loved since childhood. Her capital is a beautiful face that is emblematic of the way her country's ideals are changing; their tumultuous relationship both depends upon their shared past and is frustrated by their common need to escape it. </em></em></p><p><em><em>This short novel encompasses an especially eventful life, as its hero builds a small bottled water operation into a hugely successful company and realizes at least some of his dreams. At the same time, the substance of each chapter calls the self-help precept that began it into question--and finally the larger meaning of helping oneself. Can we help ourselves, and how much of our destinies do we control? What is the price of becoming "filthy rich," and does it mean something different for a village kid than it would for someone born into more comfortable circumstances? Hamid is especially moving on the subject of the hero's siblings, whose failure to capitalize on the city's promise has more to do with chance than with their particular characters. What the reader comes away with above all else is a feeling of tenderness for humankind as a whole--so vulnerable, and with such fierce desires.</em></em></p><h3><em><em>From Bookforum</em></em></h3><p><em><em>Though it wears the clever fleece of the self-help book, <em>How to Get Filthy Rich in Rising Asia</em> is really a bildungsroman, the story of a protagonist's formation across the precarious terrain of youth and entrance to the state of adulthood. —Siddhartha Deb </em></em></p></div>"
cover: null
db_id: null
identifiers: {mobi-asin: "B008ON449S", isbn: "9781594487293"}
languages: ["eng"]
last_modified: "2020-04-30T03:46:53+00:00"
lpath: "documents/How to Get Filthy Rich in Rising Asia_ A Novel_SPWK3C5ZUAR4SFZLNITJF6FSK64ZRXFD.azw"
mime: null
pubdate: "2013-03-04T16:00:00+00:00"
publication_type: null
publisher: "Riverhead Hardcover"
rating: 8
rights: null
series: null
series_index: null
size: 370965
tags: []
thumbnail: null
timestamp: "2019-11-18T02:18:59+00:00"
title: "How to Get Filthy Rich in Rising Asia: A Novel"
title_sort: "How to Get Filthy Rich in Rising Asia: A Novel"
user_categories: {}
user_metadata: {#mm_annotations: {…}, #isbn: {…}}
uuid: "4d8afd1b-59e1-49f7-89d5-b9bc56fd3c1b"
*/

module.exports = {
  tempBookData,
  tempAnnotations, 
  tempCalibreMetadata,
  getBookAnnotations,
  getBookMetadata
}
