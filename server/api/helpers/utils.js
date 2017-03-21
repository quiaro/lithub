const isAlphanumeric = require('validator/lib/isAlphanumeric');
const isEmail = require('validator/lib/isEmail')
const isEmpty = require('validator/lib/isEmpty')
const matches = require('validator/lib/matches');

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
  validateParams
}
