import React from 'react';
import { connect } from 'react-redux';

import * as selectors from '../reducers'
import PrivateHomeComponent from '../components/PrivateHome';
import { fetchCurrentUser } from '../actions/users';
import { getAuthToken } from '../common/auth';

class PrivateHome extends React.Component {
  componentDidMount() {
    const { currentUser, fetchCurrentUser } = this.props;
    if (!currentUser) {
      // If the state does not have the current user set, then
      // a call is made to get the user information.
      // TODO: Save the user information in session storage and
      // if present, set it in the store's initial state
      const token = getAuthToken();
      fetchCurrentUser(token);
    }
  }

  render() {
    return <PrivateHomeComponent  {...this.props} />
  }
}

const mapStateToProps = (state) => ({
  currentUser: selectors.getCurrentUser(state)
})

PrivateHome = connect(
  mapStateToProps,
  { fetchCurrentUser }
)(PrivateHome)

export default PrivateHome;
