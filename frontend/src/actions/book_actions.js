import { getAllBookDetails, getBookDetails } from '../util/book_api_util';

export const RECEIVE_BOOK = "RECEIVE_BOOK";
export const RECEIVE_ALL_BOOKS = "RECEIVE_ALL_BOOKS";

export const receiveBook = book => ({
  type: RECEIVE_BOOK,
  book
});

export const receiveAllBooks = allBooks => ({
  type: RECEIVE_ALL_BOOKS,
  allBooks
});

export const fetchBook = (id) => dispatch => (
  getBookDetails(id)
    .then(book => dispatch(receiveBook(book)))
    .catch(err => console.log(err))
);

export const fetchAllBooks = () => dispatch => (
  getAllBookDetails()
    .then(allBooks => dispatch(receiveAllBooks(allBooks)))
    .catch(err => console.log(err))
);