const mongo = require('../helpers/mongo')
const utils = require('../helpers/utils')
const secret = require('../../secrets/secrets')

function addUserToDatabase(userInfo, hash, db) {
  return db.collection('users').insertOne({
    email: userInfo.email,
    name: userInfo.name,
    username: userInfo.username,
    picture: userInfo.picture,
    password: hash.key,
    salt: hash.salt
  }).then((doc) => {
    console.log(`LOG: User with ID ${doc.insertedId} inserted in the DB`);
    userInfo.uid = doc.insertedId;
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
  } if (e.code == 409) {
    error.code = e.code;
    error.message = 'User already exists with the specified email address.';
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
    password: reqParams.password.value || '',
    picture: ''
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
    hashPromise = secret.getHashedPassword(userInfo.password, null);
    dbPromise = mongo.connect();

    Promise.all([hashPromise, dbPromise])
      .then(values => {
        hash = values[0];
        db = values[1];

        // Check if a user already exists with the email provided
        return mongo.findUserByEmail(userInfo.email, db)
          .then(() => {
            let error = handleError({ code: 409});
            res.status(error.code).json({
                 message: error.message
               })
          })
          .catch(e => {
            if (e.message == 'User not found') {
              // The email is available. We can proceed with creating the user.
              return addUserToDatabase(userInfo, hash, db)
                .then(userInfo => {
                  res.status(201).json(userInfo)
                })
            } else {
              throw e;
            }
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
