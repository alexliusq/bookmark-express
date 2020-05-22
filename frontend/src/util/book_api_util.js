import axios from 'axios';

export const getAllBookDetails = () => {
  return axios.get('/api/books');
}

export const getBookDetails = (id) => {
  return axios.get(`/api/books/${id}`);
}

export const createGoodreadsBook = (goodreadsID) => {
  return axios.post(`/api/books/goodreads/${goodreadsID}`);
}