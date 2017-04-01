import React from 'react';
import { saveAuthToken } from '../../common/auth';
import { loadScript } from '../../common/utils';

class GoogleSignin extends React.Component {

  signInUser(googleUser) {
    return this.getAppToken(googleUser.getAuthResponse().id_token)
      .then(token => {
        saveAuthToken(token);
        // Google ID token will no longer be necessary. If a JWT was
        // generated, going forward all communication with the server will
        // be done using the JWT. On the other hand, if it wasn't possible
        // to issue a JWT, revoke all permissions so if the user tries to
        // log in again he'll be prompted to grant permissions again.
        // After revoking permissions, call the prop function to dispatch
        // an authenticate action.
        googleUser.disconnect().then(this.props.onSignIn);
      })
      .catch(e => {
        // TODO: Show a notification that an error ocurred
        console.log(e.message)
        // Google permissions are revoked so user has to grant permissions
        // again if he wishes to try signing in via Google again
        googleUser.disconnect();
      })
  }

  /**
   * Trade in a Google ID token (GIDT) for an app token.
   * In order to do this, send the GIDT to the server. The server
   * will check if the access token is valid; if it is, it will
   * send back a JWT for the user to communicate with the API endpoints.
   * @param {object} googleUser - https://developers.google.com/identity/sign-in/web/reference#users
   */
  getAppToken(idToken) {
    return new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest();
      xhr.open('POST', '/api/auth/from_google_token');
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      xhr.onload = function() {
        if (xhr.status === 200) {
          resolve(JSON.parse(xhr.responseText).token)
        } else {
          reject({
            code: 500,
            message: 'Failed to create authentication token'
          })
        }
      };
      xhr.send('id_token=' + idToken);
    });
  }

  setupGoogleSignin() {
    window.gapi.signin2.render('google-signin', {
      'scope': 'profile email',
      'width': 220,
      'height': 40,
      'longtitle': true,
      'theme': 'dark',
      'onsuccess': this.signInUser.bind(this)
    });
  }

  componentDidMount() {
    // Check if the google api script already exists. If it doesn't, load
    // the script before rendering the Google Sign In button.
    if (!document.getElementById('google-api')) {
      loadScript('https://apis.google.com/js/platform.js', 'google-api', this.setupGoogleSignin.bind(this));
    } else {
      this.setupGoogleSignin()
    }
  }

  render() {
    return (
      <div id="google-signin"></div>
    );
  }
}

export default GoogleSignin;
