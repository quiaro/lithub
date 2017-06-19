import { lithubRequest } from './lithub';

export const fetchCurrentUser = () => {
  return lithubRequest('get', '/api/me');
}
