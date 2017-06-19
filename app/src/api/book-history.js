import { lithubRequest } from './lithub';

export const fetch = () => {
  return lithubRequest('get', '/api/my/books');
}

export const add = (review) => {
  return lithubRequest('post', '/api/my/books', review);
}

export const edit = (review) => {
  return lithubRequest('put', '/api/my/books', review);
}

export const remove = (review) => {
  return lithubRequest('delete', '/api/my/books', review);
}
