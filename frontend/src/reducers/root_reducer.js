import { combineReducers } from 'redux';
import books from './books_reducer';
import annotations from './annotations_reducer';

// import session from './session_reducer';

const RootReducer = combineReducers({
  books,
  annotations
});

export default RootReducer;