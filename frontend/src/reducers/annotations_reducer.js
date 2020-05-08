import {
  RECEIVE_ANNOTATION,
  RECEIVE_ALL_ANNOTATIONS,
  RECEIVE_BOOK_ANNOTATIONS
} from '../actions/annotation_actions';

const AnnotationsReducer = (state = {
  allAnnotations: [],
  bookAnnotations: [],
  annotation: {}
}, action) => {

  Object.freeze(state);
  const newState = Object.assign({}, state);

  switch(action.type) {
    case RECEIVE_ANNOTATION:
      newState.annotation = action.annotation;
      return newState;
    case RECEIVE_ALL_ANNOTATIONS:
      newState.allAnnotations = action.allAnnotations;
      return newState;
    case RECEIVE_BOOK_ANNOTATIONS:
      newState.bookAnnotations = action.bookAnnotations;
      return newState;
    default:
      return newState;
  }
};

export default AnnotationsReducer;