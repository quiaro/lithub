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

function authorize(req, res) {
  /*
  Endpoint to call after authenticating with a 3rd-party oauth provider.
  This method will be responsible for trading in an authorization code for an
  access token and storing it in a jwt.
  */
}

module.exports = {
  login: login
}
