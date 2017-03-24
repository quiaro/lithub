/* global FB */
import React from 'react';
import { loadScript } from '../../common/utils';

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
      window.FB.api(`/${userID}/permissions`, 'delete',
        function(permissionsWereDeleted) {
          if (permissionsWereDeleted) {
            resolve(true)
          } else {
            // TODO: Remove this and simply resolve to true always
            reject({
              code: 500,
              message: 'Unable to revoke permissions for user'
            })
          }
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
    const id_token = facebookUser.getAuthResponse().id_token;
    const xhr = new XMLHttpRequest();

    return new Promise((resolve, reject) => {
      xhr.open('POST', '/api/auth/from_facebook_token');
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.onload = () => {
        if (xhr.status === 200) {
          resolve(JSON.parse(xhr.responseText))
        } else {
          reject({
            code: 500,
            message: 'Failed to create authentication token'
          })
        }
      };
      xhr.send('id_token=' + id_token);
    })
  }

  statusChangeCallback(response) {
    if (response.status === 'connected') {
      console.log('callback response: ', response);

      return this.getUserInfo('id', 'name', 'email', 'first_name')
        .then(userInfo => {
          // return this.getAppToken.call(this, userInfo, response.authResponse.accessToken)
          console.log('User Info: ', userInfo);
          return userInfo;
        })
        // .then(token => {
          // TODO: Store token
        // })
        .catch(e => {
          // TODO: Show a notification that an error ocurred
          console.log(e.message)
        })
        // Facebook's Access Token will no longer be necessary. If a JWT was
        // generated, going forward all communication with the server will
        // be done using the JWT. On the other hand, if it wasn't possible
        // to issue a JWT, revoke all permissions so if the user tries to
        // log in again he'll be prompted to grant the app the correct permissions.
        // .then(this.revokePermissions(response.authReponse.userID))
        // TODO: redirect to app dashboard
        // console.log('Redirect to app dashboard');
    }
  }

  // TODO: Remove this when log out is implemented
  facebookLogout() {
    window.FB.logout(function(response) {
       console.log('The user has been logged out');
    });
  }

  componentWillUnmount() {
    window.FB && window.FB.Event.unsubscribe('auth.statusChange', this.statusChangeCallback)
  }

  componentDidMount() {
    loadScript('//connect.facebook.net/en_US/sdk.js',
               'facebook-jssdk', () => {
                 FB.init({
                   appId      : '856911707780213',
                   cookie     : true,
                   xfbml      : true,
                   version    : 'v2.8'
                 });
                 FB.Event.subscribe('auth.statusChange', this.statusChangeCallback.bind(this))
               });

    // TODO: Remove this when log out is implemented
    document.getElementById('facebook-logout').addEventListener('click', this.facebookLogout);
  }

  render() {
    return (
      <div>
        <div className="fb-login-button"
             data-max-rows="1"
             data-size="large"
             data-show-faces="false"
             data-scope="public_profile, email"
             data-auto-logout-link="false"></div>
        <button id="facebook-logout">Sign out from Facebook</button>
      </div>
    );
  }
}

export default FacebookSignin;
