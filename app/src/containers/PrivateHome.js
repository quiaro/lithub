import React from 'react';
import { connect } from 'react-redux';

import * as selectors from '../reducers'
import { fetchCurrentUser } from '../actions/users';
import { getAuthToken } from '../common/auth';
import PrivateHomeComponent from '../components/private/Home';

class PrivateHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 'isSecondaryMenuOpen': false }
    this.menuToggleHandler.bind(this);
    this.menuCloseHandler.bind(this);
    this.menuUpdateHandler.bind(this);
  }

  // Handlers for the side menu
  menuToggleHandler = () => this.setState({ 'isSecondaryMenuOpen': !this.state.open });
  menuCloseHandler = () => this.setState({ 'isSecondaryMenuOpen': false });
  menuUpdateHandler = (state) => this.setState({ 'isSecondaryMenuOpen': state });

  componentDidMount() {
    const { currentUser, fetchCurrentUser } = this.props;
    if (!currentUser) {
      // If the state does not have the current user set, then
      // a call is made to get the user information.
      // TODO: Save the user information in session storage and
      // if present, set it in the store's initial state.
      const token = getAuthToken();
      fetchCurrentUser(token);
    }
  }

  render() {
    return <PrivateHomeComponent {...this.state} {...this.props}
              menuToggle={this.menuToggleHandler}
              menuClose={this.menuCloseHandler}
              menuUpdate={this.menuUpdateHandler} />
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
