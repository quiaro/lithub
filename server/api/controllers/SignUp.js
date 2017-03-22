const mongo = require('../helpers/mongo')
const utils = require('../helpers/utils')
const confidential = require('../../confidential')

function addUserToDatabase(userInfo, hash, db) {
  return db.collection('users').insertOne({
    username: userInfo.username,
    name: userInfo.name,
    email: userInfo.email,
    password: hash.key,
    salt: hash.salt
  }).then(() => {
    console.log('LOG: User inserted in the DB');

    return db.close().then(() => {
      console.log('LOG: DB connection closed');
      return userInfo;
    })
  })
}

/**
 * Receives an error and transforms it into a standard app error object
 *
 * @param {object} e - Error object
 * @return {object} - Standard error object with the following properties:
 *                    - code: status error code
 *                    - message: error text description
 */
function handleError(e) {
  let error = new Error('Unexpected error');

  // Log error detail
  console.error(e);

  if (e.name == 'MongoError') {
    error.code = 503;
    error.message = 'Unable to connect to database. Please try again shortly.';
  } else {
    error.code = 500;
    error.message = 'Unable to create user. Please try again shortly.';
  }
  return error;
}

/**
 * Perform any sort of sanitization or transformation to the request params.
 * Returns all params bundled in an object for easier manipulation.
 * @return {object} - user sign-up info
 */
function getUserInfo(reqParams) {
  return {
    username: reqParams.username.value || '',
    name: reqParams.name.value || '',
    email: reqParams.email.value || '',
    password: reqParams.password.value || ''
  }
}

/**
 * Check that all user sign-up information is valid.
 * @param {object} userInfo
 * @return {object} paramErrors - Error strings associated to their specific
 *                                user info property.
 */
function validateUserInfo(userInfo) {
  return utils.validateParams([
    {
      label: 'username',
      type: 'alphanumeric',
      value: userInfo.username,
      emptyError: 'Please provide a username'
    },
    {
      label: 'name',
      type: 'pattern',
      pattern: /^[A-Za-z\u0080-\u00FF ]+$/,
      value: userInfo.name,
    },
    {
      label: 'email',
      type: 'email',
      value: userInfo.email,
      emptyError: 'Please provide your email address'
    },
    {
      label: 'password',
      value: userInfo.password,
      emptyError: 'Please provide your password'
    }
  ])
}

function post(req, res) {
  let userInfo = getUserInfo(req.swagger.params);
  let paramErrors = validateUserInfo(userInfo);

  if (Object.keys(paramErrors).length) {
    res.status(400).json({
         message: 'Unable to submit form. Please check the form for errors.',
         errors: paramErrors
       })
  } else {

    // Create a new user with the data provided.
    // TODO: Instead of creating the user right away, an email should be sent
    // to the user which they can then use to complete the creation of the user.
    hashPromise = confidential.getHashedPassword(userInfo.password, null);
    dbPromise = mongo.connect();

    Promise.all([hashPromise, dbPromise])
      .then(values => {
        hash = values[0];
        db = values[1];

        return addUserToDatabase(userInfo, hash, db)
          .then(utils.getUserToken)
          .then(token => {
            res.status(201).json({
                 token: token
               })
          })
      }).catch(e => {
        let error = handleError(e);
        res.status(error.code).json({
             message: error.message
           })
      })
  }
}

module.exports = {
  post: post
}
