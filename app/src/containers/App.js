import React from 'react';
import { connect } from 'react-redux';

import * as selectors from '../reducers'
import { fetchCurrentUser } from '../actions/users';
import { logOut } from '../actions/auth';
import { getAuthToken, clearAuthToken } from '../common/auth';
import AppComponent from '../components/App';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 'isSideMenuOpen': false }
    this.menuToggleHandler.bind(this);
    this.menuCloseHandler.bind(this);
    this.menuUpdateHandler.bind(this);
    this.onMenuChange.bind(this);
    this.logoutHandler.bind(this);
  }

  // Handlers for the side menu
  menuToggleHandler = () => this.setState({ 'isSideMenuOpen': !this.state.open });
  menuCloseHandler = () => this.setState({ 'isSideMenuOpen': false });
  menuUpdateHandler = (state) => this.setState({ 'isSideMenuOpen': state });
  onMenuChange = (event, value) => {
    this.props.history.push(value);
    this.menuCloseHandler();
  };

  // Logout handler
  /*
   * Remove the auth token from storage and dispatch a logout action which
   * will set the isAuthenticated property in the state to false. Any
   * private route that the user is in will, as a result, redirect the user
   * to the login page.
   */
  logoutHandler = () => {
    clearAuthToken();
    this.props.logOut();
  }

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
    return <AppComponent {...this.state} {...this.props}
              menuToggle={this.menuToggleHandler}
              menuClose={this.menuCloseHandler}
              menuUpdate={this.menuUpdateHandler}
              onMenuChange={this.onMenuChange}
              logout={this.logoutHandler} />
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.isAuthenticated,
  currentUser: selectors.getCurrentUser(state)
})

App = connect(
  mapStateToProps,
  { fetchCurrentUser, logOut }
)(App)

export default App;
