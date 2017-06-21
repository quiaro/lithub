import { lithubRequest } from './lithub';
import { getCurrentUser, saveCurrentUser } from '../common/user';

export const fetchCurrentUser = () => {
  // Try loading any saved user info, if not make a call to the backend
  // to retrieve it and save it for future reference.
  const currentUser = getCurrentUser();
  if (!currentUser) {
      return new Promise((resolve, reject) => {
        lithubRequest('get', '/api/me').then(user => {
          saveCurrentUser(user);
          resolve(user);
        })
      });
  }
  return Promise.resolve(currentUser);
}
