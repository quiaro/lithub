import { getAuthToken } from '../common/auth';

export const save = (bookReview) => {
  return new Promise((resolve, reject) => {
    const token = getAuthToken();
    const xhr = new XMLHttpRequest();

    xhr.open('post', '/api/my/books');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Authorization', `Bearer: ${token}`);
    xhr.addEventListener('load', () => {
      if (xhr.status === 201) {
        resolve(xhr.response)
      } else {
        reject({ code: xhr.status, message: JSON.parse(xhr.response).message})
      }
    });
    xhr.send(JSON.stringify(bookReview));
  });
}
