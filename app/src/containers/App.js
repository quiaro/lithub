import React from 'react';
import { connect } from 'react-redux';

import { fetchCurrentUser } from '../actions/users';
import AppComponent from '../components/App';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 'isSideMenuOpen': false }
    this.menuToggleHandler.bind(this);
    this.menuCloseHandler.bind(this);
    this.menuUpdateHandler.bind(this);
    this.onMenuChange.bind(this);
    this.redirectHandler.bind(this);
  }

  // Handlers for the side menu
  menuToggleHandler = () => this.setState({ 'isSideMenuOpen': !this.state.open });
  menuCloseHandler = () => this.setState({ 'isSideMenuOpen': false });
  menuUpdateHandler = (state) => this.setState({ 'isSideMenuOpen': state });
  onMenuChange = (event, value) => {
    this.redirectHandler(value)
  };
  redirectHandler = (path) => {
    this.props.history.push(path);
    this.menuCloseHandler();
  }

  componentDidMount() {
    const { currentUser, fetchCurrentUser } = this.props;
    if (!currentUser) {
      // If the state does not have the current user set, then
      // a call is made to get the user information.
      // TODO: Save the user information in session storage and
      // if present, set it in the store's initial state.
      fetchCurrentUser();
    }
  }

  render() {
    return <AppComponent {...this.state} {...this.props}
              menuToggle={this.menuToggleHandler}
              menuClose={this.menuCloseHandler}
              menuUpdate={this.menuUpdateHandler}
              onMenuChange={this.onMenuChange}
              redirect={this.redirectHandler} />
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.isAuthenticated,
  currentUser: state.currentUser
})

App = connect(
  mapStateToProps,
  { fetchCurrentUser }
)(App)

export default App;
