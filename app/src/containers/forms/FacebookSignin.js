/* global FB */
import React from 'react';
import { loadScript } from '../../common/utils';

class FacebookSignin extends React.Component {

  /**
   * Trade in a Google ID token (GIDT) for an app token.
   * In order to do this, send the GIDT to the server. The server
   * will check if the access token is valid; if it is, it will
   * send back a JWT for the user to communicate with the API endpoints.
   * @param {object} facebookUser - https://developers.facebook.com/identity/sign-in/web/reference#users
   */
  getAppToken(facebookUser) {
    const id_token = facebookUser.getAuthResponse().id_token;
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/api/auth/from_facebook_token');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function() {
      if (xhr.status === 200) {
        console.log('Redirect to app dashboard');
      } else {
        // Server was unable to return a JWT token so make sure to revoke
        // all the scopes that the user granted for the application
        facebookUser.disconnect();
      }
    };
    xhr.send('id_token=' + id_token);
  }

  // TODO: Remove this when log out is implemented
  facebookLogout() {
    var auth2 = window.gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
  }

  componentDidMount() {
    loadScript('//connect.facebook.net/en_US/sdk.js', 'facebook-jssdk', () => {
      FB.init({
        appId      : '856911707780213',
        xfbml      : true,
        version    : 'v2.8'
      });
    });
    // this.setupFacebookSignin();

    // TODO: Remove this when log out is implemented
    // document.getElementById('facebook-logout').addEventListener('click', this.facebookLogout);
  }

  render() {
    return (
      <div>
        <div
          className="fb-like"
          data-share="true"
          data-width="450"
          data-show-faces="true">
        </div>
        <div id="facebook-signin">Facebook sign in button</div>
        {/* <button id="facebook-logout">Sign out from Google</button> */}
      </div>
    );
  }
}

export default FacebookSignin;
