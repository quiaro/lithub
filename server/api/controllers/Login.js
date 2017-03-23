const mongo = require('../helpers/mongo')
const utils = require('../helpers/utils')
const secret = require('../../secrets/secrets')

/**
 * Perform any sort of sanitization or transformation to the request params.
 * Returns all login params bundled in an object for easier manipulation.
 * @return {object} - user login info
 */
function getLoginInfo(reqParams) {
  return {
    email: reqParams.email.value || '',
    password: reqParams.password.value || ''
  }
}

/**
 * Check that the login information is valid.
 * @param {object} loginInfo
 * @return {object} paramErrors - Error strings associated to their specific
 *                                login info property.
 */
function validateLoginInfo(loginInfo) {
  return utils.validateParams([
    {
      label: 'email',
      type: 'email',
      value: loginInfo.email,
      emptyError: 'Please provide your email address'
    },
    {
      label: 'password',
      value: loginInfo.password,
      emptyError: 'Please provide your password'
    }
  ])
}

/**
 * Find user in the database per his email address
 * @param {string} email
 * @param {object} db - Database reference
 * @return {Promise.<object|integer>} - user object | error code
 */
function findUser(email, db) {
  return new Promise((resolve, reject) => {
    console.log('LOG: Finding user in the DB');
    db.collection('users')
      .findOne({ email: email })
      .then(doc => {
        db.close().then(() => {
          console.log('LOG: DB connection closed');
          if (doc) {
            resolve(doc)
          } else {
            reject({ code: 401 })
          }
        })
      }, e => {
        db.close().then(() => {
          reject({ code: 500 })
        })
      })
    })
}

/**
 * Check that the user password corresponds to the hashed
 * password stored in the DB
 * @param {object} user - user document retrieved from the DB
 * @param {string} password - plain text password submitted by the user
 * @return {Promise.<object|integer>} - user object | error code
 */
function verifyUser(user, password) {
  return new Promise((resolve, reject) => {
    secret.getHashedPassword(password, user.salt.buffer)
      .then(hash => {
        console.log('LOG: Verifying user');
        // Compare the buffers with the two hashed values
        if (user.password.buffer.compare(hash.key) === 0) {
          resolve(user)
        } else {
          reject({ code: 401 })
        }
      }, e => {
        reject({ code: 500 })
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
  }

  if (e.code) {
    error.code = e.code;

    switch (e.code) {
      case 401:
        error.message = 'Invalid email/password combination.';
        break;
      default:  // 500
        error.message = 'Unable to fulfill request at this time.';
        break;
    }
  }

  return error;
 }

function post(req, res) {
  let loginInfo = getLoginInfo(req.swagger.params);
  let paramErrors = validateLoginInfo(loginInfo);

  if (Object.keys(paramErrors).length) {
    res.status(401).json({
         message: 'Invalid email/password combination.',
         errors: paramErrors
       })
  } else {
    // Query the database if there are no errors with the login information
    mongo.connect()
      .then(db => {
        return findUser(loginInfo.email, db)
          .then(user => {
            return verifyUser(user, loginInfo.password)
          })
          .then(utils.getUserToken)
          .then(token => {
            res.status(200).json({
                 token: token
               })
          })
      })
      .catch(e => {
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
