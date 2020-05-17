import { combineReducers } from 'redux';
import books from './books_reducer';
import annotations from './annotations_reducer';
import session from './session_reducer';
import errors from './errors_reducer';

// import session from './session_reducer';

const RootReducer = combineReducers({
  books,
  annotations,
  session,
  errors
});

export default RootReducer;