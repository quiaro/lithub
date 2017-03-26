/* global FB */
import React from 'react';
import { loadScript, saveAuthToken } from '../../common/utils';

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
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('POST', '/api/auth/from_facebook_token');
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.onload = () => {
        if (xhr.status === 200) {
          resolve(JSON.parse(xhr.responseText).token)
        } else {
          reject({
            code: 500,
            message: 'Failed to create authentication token'
          })
        }
      };
      xhr.send(JSON.stringify({
        uid: facebookUser.id,
        email: facebookUser.email,
        name: facebookUser.name,
        username: facebookUser.first_name,
        picture: facebookUser.picture.data.url,
        token: accessToken
      }));
    })
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
          return this.revokePermissions(response.authResponse.userID)
            .then(() => {
              // TODO: redirect to app dashboard
              console.log('Facebook permissions revoked after token creation');
              console.log('Redirect to app dashboard');
              return;
            })
        })
        .catch(e => {
          // TODO: Show a notification that an error ocurred
          console.log(e.message)
        })
    }
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
