const jwt = require('jsonwebtoken')

const mongo = require('../helpers/mongo')
const utils = require('../helpers/utils')
const confidential = require('../../confidential')

function login(req, res) {
  email = req.swagger.params.email.value;
  password = req.swagger.params.password.value;

  // Validate the request parameters
  let paramErrors = utils.validateParams([
    {
      label: 'email',
      type: 'email',
      value: email,
      emptyError: 'Please provide your email address'
    },
    {
      label: 'password',
      value: password,
      emptyError: 'Please provide your password'
    }
  ])

  if (Object.keys(paramErrors).length) {
    res.status(401).json({
         message: 'Invalid email/password combination.',
         errors: paramErrors
       })
  } else {
     // Query the database if there are no errors with the parameters
     mongo.connect().then(db => {
       pwdHash = email;

       db.collection('users').findOne({ email: email, pwdHash: pwdHash }).then(doc => {
         if (doc) {
           res.json({
             token: jwt.sign({ email: email }, confidential.secret)
           })
         } else {
           res.status(401).json({
                message: 'Invalid email/password combination.'
              })
         }
       }).catch(error => {
         res.status(500).json({
              message: 'Unable to fulfill request at this time.'
            })
       }).then(() => {
         // Wether successful or not, close the connection to the DB
         db.close()
       })
     }).catch(error => {
       res.status(503).json({
            message: 'Unable to connect to database. Please try again shortly.'
          })
     })
  }
}

function signup(req, res) {
  username = req.swagger.params.username.value || '';
  name = req.swagger.params.name.value || '';
  email = req.swagger.params.email.value || '';
  password = req.swagger.params.password.value || '';

  // Validate the request parameters
  let paramErrors = utils.validateParams([
    {
      label: 'username',
      type: 'alphanumeric',
      value: username,
      emptyError: 'Please provide a username'
    },
    {
      label: 'name',
      type: 'pattern',
      pattern: /^[A-Za-z\u0080-\u00FF ]+$/,
      value: name,
    },
    {
      label: 'email',
      type: 'email',
      value: email,
      emptyError: 'Please provide your email address'
    },
    {
      label: 'password',
      value: password,
      emptyError: 'Please provide your password'
    }
  ])

  if (Object.keys(paramErrors).length) {
    res.status(400).json({
         message: 'Unable to submit form. Please check the form for errors.',
         errors: paramErrors
       })
  } else {
    // Create a new user with the data provided.
    // TODO: Instead of creating the user right away, an email should be sent
    // to the user which they can then use to complete the creation of the user.
    confidential.getHashedPassword(password, null, (err, hash) => {
      if (err) {
        res.status(500).json({
             message: 'Unable to create user. Please try again shortly.'
           })
      } else {
        mongo.connect().then(db => {
          db.collection('users').insertOne({
            _id: 1000,
            username: username,
            name: name,
            email: email,
            password: hash.key,
            salt: hash.salt
          }).then(() => {
            // TODO: Create the real jwt token
            res.status(201).json({
                 token: "12345"
               })
          }).catch(error => {
            res.status(500).json({
                 message: 'Unable to create user. Please try again shortly.'
               })
          }).then(() => {
            // Close DB connection
            db.close()
          })
        }).catch(error => {
          res.status(503).json({
               message: 'Unable to connect to database. Please try again shortly.'
             })
        })
      }
    });
  }
}

function authorize(req, res) {
  /*
  Endpoint to call after authenticating with a 3rd-party oauth provider.
  This method will be responsible for trading in an authorization code for an
  access token and storing it in a jwt.
  */
}

module.exports = {
  login: login,
  signup: signup
}
