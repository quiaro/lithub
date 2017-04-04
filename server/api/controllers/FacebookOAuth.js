const mongo = require('../helpers/mongo');
const utils = require('../helpers/utils');

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

function fromFacebookToken(req, res) {
  const userProfile = req.swagger.params.userProfile.value;
  verifyFacebookToken(userProfile.token)
    .then(() => {
      return mongo.findUserOrCreate(userProfile);
    })
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
  fromFacebookToken: fromFacebookToken
}
