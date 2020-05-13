import {
  getAllAnnotations,
  getAnnotationByID,
  getAnnotationByBookID,
  postAnnotation,
  putAnnotation,
  deleteAnnotation
} from '../util/annotation_api_util';

export const RECEIVE_ANNOTATION = "RECEIVE_ANNOTATION";
export const RECEIVE_ALL_ANNOTATIONS = "RECEIVE_ALL_ANNOTATIONS";
export const RECEIVE_BOOK_ANNOTATIONS = "RECEIVE_BOOK_ANNOTATIONS";
export const EDIT_ANNOTATION = "EDIT_ANNOTATION";
export const REMOVE_ANNOTATION = "REMOVE_ANNOTATION";
export const ADD_ANNOTATION = "ADD_ANNOTATION";

function convertTimeToDatetime(annotation) {
  const time = new Date(...annotation.time.split('-'));
  return {
    ...annotation,
    time
  }
}

export const receiveAnnotation = (annotation) => ({
    type: RECEIVE_ANNOTATION,
    annotation: convertTimeToDatetime(annotation)
});

export const receiveAllAnnotations = (allAnnotations) => ({
  type: RECEIVE_ALL_ANNOTATIONS,
  allAnnotations: allAnnotations.map(anno => convertTimeToDatetime(anno))
});

export const editAnnotation = (annotation) => ({
  type: EDIT_ANNOTATION,
  annotationToEdit: convertTimeToDatetime(annotation)
})

export const addAnnotation = (annotation) => ({
  type: ADD_ANNOTATION,
  annotationToAdd: convertTimeToDatetime(annotation) 
});

export const removeAnnotation = (annotation) => ({
  type: REMOVE_ANNOTATION,
  annotationToDelete: convertTimeToDatetime(annotation)
});

//since naming collisions are a pain I decided to combine the http method
//and the action to name the thunks

export const postCreateAnnotation = (annotation) => (dispatch) => {
  postAnnotation(annotation)
    .then(anno => dispatch(addAnnotation(anno.data)))
    .catch(err => console.log(err))
}

export const deleteRemoveAnnotation = (annotation) => (dispatch) => {
  deleteAnnotation(annotation)
    .then(anno => dispatch(removeAnnotation(anno.data)))
    .catch(err => console.log(err));
}

export const putEditAnnotation = (annotation) => (dispatch) => {
  putAnnotation(annotation)
    .then(anno => dispatch(editAnnotation(anno.data)))
    .catch(err => console.log(err));
}

export const receiveBookAnnotations = (allAnnotations) => ({
  type: RECEIVE_BOOK_ANNOTATIONS,
  allAnnotations: allAnnotations.map(anno => convertTimeToDatetime(anno)),
});

export const fetchAnnotation = (id) => (dispatch) => {
  getAnnotationByID(id)
    .then(anno => dispatch(receiveAnnotation(anno.data)))
    .catch(err => console.log(err))
}

export const fetchAllAnnotations = () => (dispatch) => {
  getAllAnnotations()
    .then(allAnnotations => dispatch(
        receiveAllAnnotations(allAnnotations.data)
    ))
    .catch(err => console.log(err));
}

export const fetchBookAnnotations = (bookID) => (dispatch) => {
  getAnnotationByBookID(bookID)
    .then(bookAnnotations => dispatch(
      receiveBookAnnotations(bookAnnotations.data)
    ))
    .catch(err => console.log(err));
}