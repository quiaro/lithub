const GoogleAuth = require('google-auth-library');
const mongo = require('../helpers/mongo')
const utils = require('../helpers/utils')
const gapiSecret = require("../../secrets/gapi_client_secret.json");

/**
 * Verify if a Google ID Token is valid or not.
 *
 * @param {string} token - Google ID token hash
 * @return {Promise.<object|Error>} - User profile information (i.e. name, email, etc.)
 */
function verifyGoogleToken(token) {
  return new Promise((resolve, reject) => {
    const CLIENT_ID = gapiSecret.web.client_id;

    // Instantiate Google Library which will be used to verify
    // the Google ID token
    const auth = new GoogleAuth();
    const client = new auth.OAuth2(CLIENT_ID, '', '');

    client.verifyIdToken(token, CLIENT_ID, function(e, login) {
      if (e) {
        reject(new Error('Unable to verify ID token.'));
      } else {
        // From the verified token, extract the user profile information
        // per definition in: /server/api/swagger/swagger.yaml
        var payload = login.getPayload();
        resolve({
          email: payload.email,
          name: payload.name,
          username: payload.given_name,
          picture: payload.picture,
        })
      }
    });
  })
}

function fromGoogleToken(req, res) {
  const token = req.swagger.params.id_token.value;
  verifyGoogleToken(token)
    // Create user in the DB if he doesn't already exist
    .then(mongo.findUserOrCreate)
    .then(utils.getUserToken)
    .then(token => {
      res.status(200).json({ token: token })
    })
    .catch(e => {
      console.error(e);
      res.status(500).json({ message: 'Unable to sign in user' });
    })
}

module.exports = {
  fromGoogleToken: fromGoogleToken
}
