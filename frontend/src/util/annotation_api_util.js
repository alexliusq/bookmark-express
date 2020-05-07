import axios from 'axios';

export const getAllAnnotations = () => {
  return axios.get('/api/annotations/');
}

export const getAnnotationByID = id => {
  return axios.get(`/api/annotations/${id}`);
}

export const getAnnotationByBookID = bookID => {
  return axios.get(`/api/annotations/bookdID/${bookID}`)
}