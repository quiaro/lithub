const mongo = require('../helpers/mongo')
const md5 = require('crypto-js/md5')
const jwt = require('jsonwebtoken');
const secret = require('../../secret');

function login(req, res) {
  mongo.connect().then(db => {
    username = req.swagger.params.username.value;
    password = req.swagger.params.password.value;
    pwdHash = md5(username);

    db.collection('users').findOne({ username: username, pwdHash: pwdHash }).then(doc => {
      res.json({
        token: jwt.sign({ username: username }, secret)
      })
    }).catch(error => {
      res.end(JSON.stringify(error))
    }).then(() => {
      db.close()
    })
  })
}

module.exports = {
  login: login
}
