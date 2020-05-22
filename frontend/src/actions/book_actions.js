import { getAllBookDetails, getBookDetails,
  createGoodreadsBook } from '../util/book_api_util';

export const RECEIVE_BOOK = "RECEIVE_BOOK";
export const RECEIVE_ALL_BOOKS = "RECEIVE_ALL_BOOKS";
export const APPEND_BOOK = "APPEND_BOOK";

function convertPubdateToDate(book) {
  if (book.pubdate) {
    const pubdate = new Date(...book.pubdate.split('-'));
    // console.log(pubdate);
    return {
      ...book,
      pubdate
    }
  } else if (book.publicationYear) {
    const pubdate = new Date(book.publicationYear,
      book.publicationMonth, book.publicationDay);
    return {
      ...book,
      pubdate
    }
  } else {
    return book;
  }
}

export const receiveBook = (book) => ({
    type: RECEIVE_BOOK,
    book: convertPubdateToDate(book)
});


export const receiveAllBooks = (allBooks) => ({
  type: RECEIVE_ALL_BOOKS,
  allBooks: allBooks.map(book => convertPubdateToDate(book))
});

export const appendBook = (book => ({
  type: APPEND_BOOK,
  book: convertPubdateToDate(book)
}))


export const fetchBook = (id) => (dispatch) => (
  getBookDetails(id)
    .then(book => dispatch(receiveBook(book.data)))
    .catch(err => console.log(err))
);

export const fetchAllBooks = () => (dispatch) => (
  getAllBookDetails()
    .then(allBooks => {
      dispatch(receiveAllBooks(allBooks.data))
    })
    .catch(err => console.log(err))
);

export const addGoodreadsBook = (goodreadsID) => (dispatch) => (
  createGoodreadsBook(goodreadsID)
    .then(book => {
      dispatch(appendBook(book.data))
    })
    .catch(err => console.log(err))
);