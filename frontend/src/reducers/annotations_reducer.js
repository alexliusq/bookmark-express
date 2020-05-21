import {
  RECEIVE_ANNOTATION,
  RECEIVE_ALL_ANNOTATIONS,
  RECEIVE_BOOK_ANNOTATIONS,
  EDIT_ANNOTATION,
  REMOVE_ANNOTATION,
  ADD_ANNOTATION
} from '../actions/annotation_actions';

const AnnotationsReducer = (state = {
  allAnnotations: [],
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
      newState.allAnnotations = action.allAnnotations;
      return newState;
    case EDIT_ANNOTATION:
      newState.allAnnotations = state.allAnnotations
        .map(anno => {
          if (anno.id === action.annotationToEdit.id) return action.annotationToEdit;
          return anno
        });
      return newState;
    case REMOVE_ANNOTATION:
      newState.allAnnotations = state.allAnnotations
        .filter(anno => {
          return anno.id !== action.annotationToDelete.id
        });
      return newState;
    case ADD_ANNOTATION:
      newState.allAnnotations = [...state.allAnnotations, action.annotationToAdd];
      return newState;
    default:
      return newState;
  }
};

export default AnnotationsReducer;