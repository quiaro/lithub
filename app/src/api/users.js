import { getAuthToken } from '../common/auth';

export const fetchCurrentUser = (token) => {
  return new Promise((resolve, reject) => {
    const token = getAuthToken();
    const xhr = new XMLHttpRequest();

    xhr.open('get', '/api/me');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Authorization', `Bearer: ${token}`);
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        resolve(JSON.parse(xhr.response))
      } else {
        reject({code: xhr.status, message: JSON.parse(xhr.response).message })
      }
    });
    xhr.send();
  });
}
