import axios from 'axios';

export const getAllAnnotations = () => {
  return axios.get('/api/annotations/');
}

export const getAnnotationByID = id => {
  return axios.get(`/api/annotations/${id}`);
}

export const getAnnotationByBookID = bookID => {
  return axios.get(`/api/annotations/bookID/${bookID}`)
}

export const postAnnotation = (data) => {
  return axios.post('/api/annotations/', data);
}

export const postCalibreAnnotation = (data) => {
  return axios.post('/api/annotations/calibre/', data);
}

export const putAnnotation = (data) => {
  return axios.put('/api/annotations/', data);
}

export const deleteAnnotation = (data) => {
  return axios.delete('/api/annotations/', data);
}