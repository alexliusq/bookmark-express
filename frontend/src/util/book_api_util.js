import axios from 'axios';

export const getAllBookDetails = () => {
  return axios.get('/api/books');
}

export const getBookDetails = (id) => {
  return axios.get(`/api/books/${id}`);
}