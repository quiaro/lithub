import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { clearAuthToken } from '../common/auth';
import { logOut } from '../actions/auth';

class Logout extends React.Component {

  constructor(props) {
    super(props);

    // Remove the auth token from storage and dispatch a logout action which
    // will set the isAuthenticated property in the state to false. Then, the
    // render method will redirect the user to the login page.
    clearAuthToken();
    props.logOut();
  }

  render() {
    return <Redirect to='/login'/>
  }
}

Logout = connect(undefined, { logOut })(Logout)

export default Logout;
