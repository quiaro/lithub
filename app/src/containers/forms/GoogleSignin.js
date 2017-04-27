import React from 'react';
import { saveAuthToken } from '../../common/auth';
import { loadScript } from '../../common/utils';
import * as apiAuth from '../../api/auth';
import '../../styles/containers/forms/GoogleSignin.css';

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
    return apiAuth.viaGoogleToken(idToken);
  }

  setupGoogleSignin() {
    // Building a custom button per:
    // https://developers.google.com/identity/sign-in/web/build-button#building_a_button_with_a_custom_graphic
    // To fix issue described in:
    // http://stackoverflow.com/questions/37472453/cannot-read-property-style-of-null-google-sign-in-button
    const signInBtn = document.getElementById('google-signin');

    window.gapi.load('auth2', () => {
      // Retrieve the singleton for the GoogleAuth library
      const auth2 = window.gapi.auth2.init({
        client_id: 'REPLACE_WITH_GOOGLE_ID.apps.googleusercontent.com'
      });
      auth2.attachClickHandler(signInBtn, { scope: 'profile email' }, this.signInUser.bind(this));
    })
  }

  componentDidMount() {
    // Check if the google api script already exists. If it doesn't, load
    // the script before rendering the Google Sign In button.
    if (!document.getElementById('google-api')) {
      loadScript('https://apis.google.com/js/api:client.js', 'google-api', this.setupGoogleSignin.bind(this));
    } else {
      this.setupGoogleSignin()
    }
  }

  render() {
    return (
      <div id="google-signin">
        <span className="icon">
          <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
            <g>
               <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
               <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
               <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
               <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path><path fill="none" d="M0 0h48v48H0z"></path>
             </g>
           </svg>
        </span>
        <span className="buttonText">Sign in with Google</span>
      </div>
    );
  }
}

export default GoogleSignin;
