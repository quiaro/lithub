const isEmail = require('validator/lib/isEmail')
const isEmpty = require('validator/lib/isEmpty')

function validateParams(paramsArray) {
  let errors = {};
  for (let i = paramsArray.length - 1; i >= 0; i--) {
    let paramsObject = paramsArray[i];

    if (isEmpty(paramsObject.value)) {
      errors[paramsObject.label] = paramsObject.emptyError;
      break;
    }

    if (paramsObject.type === 'email') {
      if (!isEmail(paramsObject.value)) {
        errors[paramsObject.label] = 'Please provide a valid email address';
        break;
      }
    }
  }
  return errors;
}

module.exports = {
  validateParams
}
