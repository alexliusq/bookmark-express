import axios from 'axios';

export const getAllTags = () => {
  return axios.get('/api/tags/');
}

export const postTagToAnnotation = (data) => {
  return axios.post('/api/tags/', data);
}

export const deleteTagFromAnnotation = (data) => {
  return axios.delete('/api/tags', data);
}