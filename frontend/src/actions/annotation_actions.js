import {
  getAllAnnotations,
  getAnnotationByID,
  getAnnotationByBookID
} from '../util/annotation_api_util';

export const RECEIVE_ANNOTATION = "RECEIVE_ANNOTATION";
export const RECEIVE_ALL_ANNOTATIONS = "RECEIVE_ALL_ANNOTATIONS";
export const RECEIVE_BOOK_ANNOTATIONS = "RECEIVE_BOOK_ANNOTATIONS";

function convertTimeToDatetime(annotation) {
  const time = new Date(...time.split('-'));
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

export const receiveBookAnnotations = (bookAnnotations) => ({
  type: RECEIVE_BOOK_ANNOTATIONS,
  bookAnnotations: bookAnnotations.map(anno => convertTimeToDatetime(anno))
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