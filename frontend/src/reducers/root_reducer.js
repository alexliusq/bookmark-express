import { combineReducers } from 'redux';
import books from './books_reducer';
import annotations from './annotations_reducer';
import sessions from './session_reducer';
import errors from './errors_reducer';

// import session from './session_reducer';

const RootReducer = combineReducers({
  books,
  annotations,
  sessions,
  errors
});

export default RootReducer;