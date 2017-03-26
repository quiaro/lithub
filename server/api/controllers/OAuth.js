const GoogleAuth = require('google-auth-library');
const mongo = require('../helpers/mongo')
const utils = require('../helpers/utils')
const gapiSecret = require("../../secrets/gapi_client_secret.json");

function fromGoogleToken(req, res) {
  const CLIENT_ID = gapiSecret.web.client_id;
  const token = req.swagger.params.id_token.value;
  // Instantiate Google Library which will be used to verify
  // the Google ID token
  const auth = new GoogleAuth();
  const client = new auth.OAuth2(CLIENT_ID, '', '');

  client.verifyIdToken(token, CLIENT_ID, function(e, login) {
    if (e) {
      res.status(500).json({ message: 'Unable to verify ID token.' });
    } else {
      // From the verified token, extract the data that will be used
      // as payload in the JWT
      var payload = login.getPayload();
      // TODO: Register new user in the DB
      utils.getUserToken({
        username: payload.given_name,
        name: payload.name,
        email: payload.email,
        picture: payload.picture
      }).then(token => {
        res.status(200).json({ token: token })
      })
    }
  });
}

/**
 * Verify if a Facebook Access Token is valid or not.
 *
 * @param {string} token - Facebook access token hash
 * @return {Promise.<true|Error>}
 */
function verifyFacebookToken(token) {
  return new Promise((resolve, reject) => {
    const verifyTokenURL = `https://graph.facebook.com/debug_token?input_token=${token}&access_token=${token}`;
    utils.getURLContent(verifyTokenURL)
      .then(payload => {
        const res = JSON.parse(payload);
        if (res.data.is_valid) {
          resolve(true)
        } else {
          reject(new Error('Invalid token'));
        }
      })
      .catch(error => reject(error))
  })
}

/**
 * Check if a user already exists in the DB, if not create him
 * with the profile information provided
 *
 * @param {object} userProfile - User profile per definition in: /server/api/swagger/swagger.yaml
 * @return {Promise.<true|Error>}
 */
function checkUser(userProfile, db) {
  return new Promise((resolve, reject) => {
    mongo.findUserById(userProfile.uid, db)
      .then(() => { resolve(userProfile) })
      .catch(() => {
        mongo.findUserByEmail(userProfile.email, db)
          .then(() => { resolve(userProfile) })
          .catch(() => {
            mongo.createUser(userProfile, null, db)
              .then((doc) => {
                userProfile.uid = doc._id;
                resolve(userProfile)
              })
              .catch(() => {
                reject(new Error('Unable to create new user signed in via 3rd-party oauth'));
              })
          })
      })
  })
}

function fromFacebookToken(req, res) {
  const userProfile = req.swagger.params.userProfile.value;
  verifyFacebookToken(userProfile.token)
    .then(() => {
      // Create user in the DB if he doesn't already exist
      return mongo.connect().then(db => {
        return checkUser(userProfile, db).then(userProfile => {
          return db.close().then(() => {
            return userProfile;
          })
        }, () => {
          return db.close().then(() => {
            throw new Error('Check existence of user failed')
          })
        })
      })
    })
    .then(utils.getUserToken)
    .then(token => {
      res.status(200).json({ token: token })
    })
    .catch(e => {
      res.status(500).json({ message: 'Unable to sign in user' });
    })
}

module.exports = {
  fromGoogleToken: fromGoogleToken,
  fromFacebookToken: fromFacebookToken
}
