import React from 'react';

class GoogleSignin extends React.Component {

  constructor(props) {
    super(props);
    this.onSuccess = this.onSuccess.bind(this);
  }

  onSuccess(googleUser) {
    // const googleAuth = window.gapi.auth2.getAuthInstance();
    const authResponse = googleUser.getAuthResponse(true);
    // TODO: Get the access token and send it to the server.
    // The server will check if the access token is valid.
    // If it is, it will send back a jwt to the user.
    console.log('Auth response: ', authResponse);
    //  + googleUser.getBasicProfile().getName()
  }

  setupGoogleSignin() {
    if (window.gapi) {
      window.gapi.signin2.render('google-signin2', {
        'scope': 'profile email',
        'width': 220,
        'height': 40,
        'longtitle': true,
        'theme': 'dark',
        'onsuccess': this.onSuccess
      });
    } else {
      setTimeout(this.setupGoogleSignin, 10);
    }
  }

  componentDidMount() {
    this.setupGoogleSignin();
  }

  render() {
    return (
      <div id="google-signin2"></div>
    );
  }
}

export default GoogleSignin;
