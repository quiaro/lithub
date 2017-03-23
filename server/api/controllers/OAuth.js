const GoogleAuth = require('google-auth-library');
const utils = require('../helpers/utils')
const gapiSecret = require("../../secrets/gapi_client_secret.json");

function fromGoogleToken(req, res) {
  const CLIENT_ID = gapiSecret.web.client_id;
  const token = req.swagger.params.id_token.value;
  const auth = new GoogleAuth();
  const client = new auth.OAuth2(CLIENT_ID, '', '');

  client.verifyIdToken(token, CLIENT_ID, function(e, login) {
    if (e) {
      res.status(500).json({ message: 'Unable to verify ID token.' });
    } else {
      // From the verified token, extract the data that will be used
      // as payload in the JWT
      var payload = login.getPayload();
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

module.exports = {
  fromGoogleToken: fromGoogleToken
}
