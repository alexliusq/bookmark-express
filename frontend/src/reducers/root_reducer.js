import { combineReducers } from 'redux';
import books from './books_reducer';
// import session from './session_reducer';

const RootReducer = combineReducers({
  books
});

export default RootReducer;