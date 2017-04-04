const jwt = require('jsonwebtoken')
const isAlphanumeric = require('validator/lib/isAlphanumeric')
const isEmail = require('validator/lib/isEmail')
const isEmpty = require('validator/lib/isEmpty')
const matches = require('validator/lib/matches')
const secret = require('../../secrets/secrets')

/**
 * Generate a signed jason web token (jwt) that stores
 * the user's basic information
 *
 * @param {object} user - User profile object
 * @return {Promise.<string|object>} - user
 */
function getUserToken(user) {
  return new Promise((resolve, reject) => {
    jwt.sign({
      iss: 'lithub',
      uid: user.uid || user._id || '',  // FIXME: Use only user._id
      preferred_username: user.username,
      name: user.name,
      email: user.email,
      picture: user.picture || ''
    }, secret.secret, { expiresIn: '7d' }, (err, token) => {
      if (err) {
        reject({ code: 500 });
      } else {
        resolve(token);
      }
    })
  })
}

/**
 * Make a GET request to a specific url
 *
 * How to get node.js HTTP request promise without a single dependency
 * Per https://www.tomas-dvorak.cz/posts/nodejs-request-without-dependencies/
 *
 * @param {string} url - Request URL
 * @return {Promise.<string|object>} - Content of the requested URL
 */
function getURLContent (url) {
  const lib = url.startsWith('https') ? require('https') : require('http');
  // return new pending promise
  return new Promise((resolve, reject) => {
    // select http or https module, depending on requested url
    const request = lib.get(url, (response) => {
      // handle http errors
      if (response.statusCode < 200 || response.statusCode > 299) {
         reject(new Error('Failed to load, status code: ' + response.statusCode));
       }
      // temporary data holder
      const body = [];
      // on every content chunk, push it to the data array
      response.on('data', (chunk) => body.push(chunk));
      // we are done, resolve promise with those joined chunks
      response.on('end', () => resolve(body.join('')));
    });
    // handle connection errors of the request
    request.on('error', (err) => reject(err))
  })
};

/**
 * Validate a list of params
 *
 * @param {object[]} paramsArray - array of params to validate
 * @return {object}
 */
function validateParams(paramsArray) {
  let errors = {};
  for (let i = paramsArray.length - 1; i >= 0; i--) {
    let paramsObject = paramsArray[i];

    if (paramsObject.emptyError && isEmpty(paramsObject.value)) {
      errors[paramsObject.label] = paramsObject.emptyError;
      continue;
    }

    if (paramsObject.type === 'email') {
      if (!isEmail(paramsObject.value)) {
        errors[paramsObject.label] = 'Please provide a valid email address';
        continue;
      }
    }

    if (paramsObject.type === 'alphanumeric') {
      if (!isAlphanumeric(paramsObject.value)) {
        errors[paramsObject.label] = 'Only letters and numbers are allowed';
        continue;
      }
    }

    if (paramsObject.type === 'pattern') {
      if (!matches(paramsObject.value, paramsObject.pattern, 'i')) {
        errors[paramsObject.label] = 'Only letters and spaces are allowed';
        continue;
      }
    }
  }
  return errors;
}

module.exports = {
  getUserToken,
  getURLContent,
  validateParams
}
