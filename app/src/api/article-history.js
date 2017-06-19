import { lithubRequest } from './lithub';

export const fetch = () => {
  return lithubRequest('get', '/api/my/articles');
}

export const add = (review) => {
  return lithubRequest('post', '/api/my/articles', review);
}

export const edit = (review) => {
  return lithubRequest('put', '/api/my/articles', review);
}

export const remove = (review) => {
  return lithubRequest('delete', '/api/my/articles', review);
}
