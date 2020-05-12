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

export const addAnnotation = (data) => {
  return axios.post('/api/annotations/', data);
}

export const addCalibreAnnotation = (data) => {
  return axios.post('/api/annotations/calibre/', data);
}

export const editAnnotation = (data) => {
  return axios.put('/api/annotations/', data);
}

export const deleteAnnotation = (data) => {
  return axios.delete('/api/annotations/', data);
}