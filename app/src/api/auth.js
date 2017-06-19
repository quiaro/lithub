import { URLprefix } from './lithub';

export const viaLogin = (user) => {
  return new Promise((resolve, reject) => {
    const email = encodeURIComponent(user.email);
    const password = encodeURIComponent(user.password);
    const formData = `email=${email}&password=${password}`;
    const xhr = new XMLHttpRequest();
    xhr.open('post', `${URLprefix}/api/auth/login`);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        resolve(xhr.response.token)
      } else {
        const errors = xhr.response.errors ? xhr.response.errors : {};
        errors.summary = xhr.response.message;
        reject(errors)
      }
    });
    xhr.send(formData);
  });
}

export const signUp = (user) => {
  return new Promise((resolve, reject) => {
    // create a string for an HTTP body message
    const username = encodeURIComponent(user.username);
    const email = encodeURIComponent(user.email);
    const password = encodeURIComponent(user.password);
    const name = user.name;

    let formData = `username=${username}&email=${email}&password=${password}`;
    formData = name ? formData + `&name=${name}` : formData;

    // create an AJAX request
    const xhr = new XMLHttpRequest();
    xhr.open('post', `${URLprefix}/api/auth/signup`);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status === 201) {
        resolve(xhr.response)
      } else {
        const errors = xhr.response.errors ? xhr.response.errors : {};
        errors.summary = xhr.response.message;
        reject(errors)
      }
    });
    xhr.send(formData);
  });
}

export const viaFacebookToken = (user, accessToken) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', `${URLprefix}/api/auth/from_facebook_token`);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = () => {
      if (xhr.status === 200) {
        resolve(JSON.parse(xhr.responseText).token)
      } else {
        reject({code: 500, message: 'Failed to create authentication token'})
      }
    };
    xhr.send(JSON.stringify(user));
  });
}

export const viaGoogleToken = (googleIdToken) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', `${URLprefix}/api/auth/from_google_token`);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function() {
      if (xhr.status === 200) {
        resolve(JSON.parse(xhr.responseText).token)
      } else {
        reject({code: 500, message: 'Failed to create authentication token'})
      }
    };
    xhr.send('id_token=' + googleIdToken);
  });
}
