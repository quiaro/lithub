import { lithubRequest } from './lithub';

export const fetch = () => {
  return lithubRequest('get', '/api/my/quotes');
}

export const add = (review) => {
  return lithubRequest('post', '/api/my/quotes', review);
}

export const edit = (review) => {
  return lithubRequest('put', '/api/my/quotes', review);
}

export const remove = (review) => {
  return lithubRequest('delete', '/api/my/quotes', review);
}
