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

export const fetchHistory = () => {
  return new Promise((resolve, reject) => {
    const token = getAuthToken();
    const xhr = new XMLHttpRequest();

    xhr.open('get', '/api/my/books');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Authorization', `Bearer: ${token}`);
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        resolve(JSON.parse(xhr.response))
      } else {
        reject({ code: xhr.status, message: JSON.parse(xhr.response).message})
      }
    });
    xhr.send();
  });
}

export const addBookToHistory = (review) => {
  return new Promise((resolve, reject) => {
    const token = getAuthToken();
    const xhr = new XMLHttpRequest();

    xhr.open('post', '/api/my/books');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Authorization', `Bearer: ${token}`);
    xhr.addEventListener('load', () => {
      if (xhr.status === 201) {
        resolve(JSON.parse(xhr.response))
      } else {
        if (typeof xhr.response === 'string') {
          // A "handled" error response generated by the server should
          // come in the form of a JSON object. If not, attach a generic
          // message.
          reject({
            code: xhr.status,
            message: 'Unable to fulfill request at this time. Please try again later.'
          })
        } else {
          reject({ code: xhr.status, message: JSON.parse(xhr.response).message})
        }
      }
    });
    xhr.send(JSON.stringify(review));
  });
}

export const editBookInHistory = (review) => {
  return new Promise((resolve, reject) => {
    const token = getAuthToken();
    const xhr = new XMLHttpRequest();

    xhr.open('put', '/api/my/books');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Authorization', `Bearer: ${token}`);
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        resolve(JSON.parse(xhr.response))
      } else {
        if (typeof xhr.response === 'string') {
          // A "handled" error response generated by the server should
          // come in the form of a JSON object. If not, attach a generic
          // message.
          reject({
            code: xhr.status,
            message: 'Unable to fulfill request at this time. Please try again later.'
          })
        } else {
          reject({ code: xhr.status, message: JSON.parse(xhr.response).message})
        }
      }
    });
    xhr.send(JSON.stringify(review));
  });
}

export const deleteBookFromHistory = (review) => {
  return new Promise((resolve, reject) => {
    const token = getAuthToken();
    const xhr = new XMLHttpRequest();

    xhr.open('delete', '/api/my/books');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Authorization', `Bearer: ${token}`);
    xhr.addEventListener('load', () => {
      if (xhr.status === 204) {
        resolve()
      } else {
        if (typeof xhr.response === 'string') {
          // A "handled" error response generated by the server should
          // come in the form of a JSON object. If not, attach a generic
          // message.
          reject({
            code: xhr.status,
            message: 'Unable to fulfill request at this time. Please try again later.'
          })
        } else {
          reject({ code: xhr.status, message: JSON.parse(xhr.response).message})
        }
      }
    });
    xhr.send(JSON.stringify(review));
  });
}
