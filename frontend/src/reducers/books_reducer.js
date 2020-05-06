import { RECEIVE_BOOK, RECEIVE_ALL_BOOKS } from '../actions/book_actions';

const BooksReducer = (state = {
  allBooks: [],
  book: {}
}, action) => {
  Object.freeze(state);
  let newState = Object.assign({}, state);

  switch(action.type) {
    case RECEIVE_BOOK:
      newState.book = action.book;
      return newState;
    case RECEIVE_ALL_BOOKS:
      newState.allBooks = action.allBooks;
      return newState;
    default:
      return state;
  }
};

export default BooksReducer;