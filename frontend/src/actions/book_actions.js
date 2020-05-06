import { getAllBookDetails, getBookDetails } from '../util/book_api_util';

export const RECEIVE_BOOK = "RECEIVE_BOOK";
export const RECEIVE_ALL_BOOKS = "RECEIVE_ALL_BOOKS";

function convertPubdateToDate(book) {
  const pubdate = new Date(...book.pubdate.split('-'));
  // console.log(pubdate);
  return {
    ...book,
    pubdate
  }
}

export const receiveBook = book => {
  return {
    type: RECEIVE_BOOK,
    book: convertPubdateToDate(book)};
  }


export const receiveAllBooks = allBooks => ({
  type: RECEIVE_ALL_BOOKS,
  allBooks: allBooks.map(book => convertPubdateToDate(book))
});

export const fetchBook = (id) => dispatch => (
  getBookDetails(id)
    .then(book => dispatch(receiveBook(book.data)))
    .catch(err => console.log(err))
);

export const fetchAllBooks = () => dispatch => (
  getAllBookDetails()
    .then(allBooks => {
      dispatch(receiveAllBooks(allBooks.data))
    })
    .catch(err => console.log(err))
);