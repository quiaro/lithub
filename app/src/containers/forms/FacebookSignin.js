/* global FB */
import React from 'react';
import { saveAuthToken } from '../../common/auth';
import { loadScript } from '../../common/utils';
import * as apiAuth from '../../api/auth';

class FacebookSignin extends React.Component {

  /**
   * Call Facebook's Graph API to get the user's profile information
   * necessary for issuing a JWT.
   *
   * @param {string[]} fields - name of all the user fields that will be fetched
   * @return {Promise.<object>} - Object made up of key/value pairs where the
   *                              keys are the user fields that were requested.
   */
  getUserInfo(...fields) {
    let params = { fields: fields }
    return new Promise((resolve, reject) => {
      window.FB.api('/me', 'get', params, function(response) {
        if (!response || response.error) {
          reject({
            code: 500,
            message: 'Unable to read user information to complete sign in via Facebook'
          })
        } else {
          resolve(response)
        }
      });
    })
  }

  revokePermissions(userId) {
    return new Promise((resolve, reject) => {
      window.FB.api(`/${userId}/permissions`, 'delete',
        function() {
          resolve(true)
        }
      )
    })
  }

  /**
   * Trade in a Facebook Access Token (FBAT) for an app token.
   * In order to do this, send the FBAT to the server. The server
   * will check if the access token is valid; if it is, it will
   * send back a JWT for the user to communicate with the API endpoints.
   * @param {object} facebookUser - https://developers.facebook.com/identity/sign-in/web/reference#users
   */
  getAppToken(facebookUser, accessToken) {
    return apiAuth.viaFacebookToken({
      uid: facebookUser.id,
      email: facebookUser.email,
      name: facebookUser.name,
      username: facebookUser.first_name,
      picture: facebookUser.picture.data.url,
      token: accessToken
    }, accessToken);
  }

  statusChangeCallback(response) {
    if (response.status === 'connected') {
      return this.getUserInfo('id', 'email', 'name', 'first_name', 'picture')
        .then(userInfo => {
          return this.getAppToken(userInfo, response.authResponse.accessToken)
        })
        .then(token => {
          saveAuthToken(token);
          // Facebook's Access Token will no longer be necessary. If a JWT was
          // generated, going forward all communication with the server will
          // be done using the JWT. On the other hand, if it wasn't possible
          // to issue a JWT, revoke all permissions so if the user tries to
          // log in again he'll be prompted to grant the app the correct permissions.

          // After revoking permissions, call the prop function to dispatch
          // an authenticate action.
          return this.revokePermissions(response.authResponse.userID)
            .then(this.props.onSignIn)
        })
        .catch(e => {
          // TODO: Show a notification that an error ocurred
          console.log(e.message)
          // Facebook permissions are revoked so user has to grant permissions
          // again if he wishes to try signing in via Facebook again
          this.revokePermissions(response.authResponse.userID)
            .then(() => {
              console.log('Facebook permissions revoked');
            })
        })
    }
  }

  componentWillUnmount() {
    // Remove everything that is related to the Facebook SDK:
    // - The subscription to the 'auth.statusChange' event
    window.FB && window.FB.Event.unsubscribe('auth.statusChange', this.statusChangeCallback);
    window.FB = null;

    // - The Facebook SDK script
    let FBscript = document.getElementById('facebook-jssdk');
    FBscript.parentNode.removeChild(FBscript);
    FBscript = null;

    // - The DOM element that contains the Facebook iframe
    let FBroot = document.getElementById('fb-root');
    FBroot.parentNode.removeChild(FBroot);
    FBroot = null;

    // Several attempts were made to keep the SDK script and only run the
    // init callback on subsequent mounts (like the Google Sign In component)
    // but then, there were problems with the 'auth.statusChange' event handler
    // not running after the component was mounted a second time. In the end,
    // this was the way to make it work on subsequent mounts ... what a pity!
  }

  componentDidMount() {
    loadScript('//connect.facebook.net/en_US/sdk.js',
               'facebook-jssdk', () => {
                 window.FB.init({
                   appId      : '856911707780213',
                   cookie     : true,
                   xfbml      : true,
                   version    : 'v2.8'
                 });
                 window.FB.Event.subscribe('auth.statusChange', this.statusChangeCallback.bind(this))
               });
  }

  render() {
    return (
      <div className="fb-login-button"
           data-max-rows="1"
           data-size="large"
           data-show-faces="false"
           data-scope="public_profile, email"
           data-auto-logout-link="false"></div>
    );
  }
}

export default FacebookSignin;
