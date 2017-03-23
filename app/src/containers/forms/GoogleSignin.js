import React from 'react';

class GoogleSignin extends React.Component {

  /**
   * Trade in a Google ID token (GIDT) for an app token.
   * In order to do this, send the GIDT to the server. The server
   * will check if the access token is valid; if it is, it will
   * send back a JWT for the user to communicate with the API endpoints.
   * @param {object} googleUser - https://developers.google.com/identity/sign-in/web/reference#users
   */
  getAppToken(googleUser) {
    const id_token = googleUser.getAuthResponse().id_token;
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/api/auth/from_google_token');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function() {
      if (xhr.status === 200) {
        console.log('Redirect to app dashboard');
      } else {
        // Server was unable to return a JWT token so make sure to revoke
        // all the scopes that the user granted for the application
        googleUser.disconnect();
      }
    };
    xhr.send('id_token=' + id_token);
  }

  setupGoogleSignin() {
    if (window.gapi) {
      window.gapi.signin2.render('google-signin2', {
        'scope': 'profile email',
        'width': 220,
        'height': 40,
        'longtitle': true,
        'theme': 'dark',
        'onsuccess': this.getAppToken
      });
    } else {
      setTimeout(this.setupGoogleSignin, 10);
    }
  }

  // TODO: Remove this when log out is implemented
  googleLogout() {
    var auth2 = window.gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
  }

  componentDidMount() {
    this.setupGoogleSignin();

    // TODO: Remove this when log out is implemented
    document.getElementById('google-logout').addEventListener('click', this.googleLogout);
  }

  render() {
    return (
      <div>
        <div id="google-signin2"></div>
        <button id="google-logout">Sign out from Google</button>
      </div>
    );
  }
}

export default GoogleSignin;
