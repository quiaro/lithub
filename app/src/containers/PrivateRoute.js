import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

class PrivateRoute extends React.Component {
  render() {
    const { component, isAuthenticated, ...rest} = this.props;
    return <Route {...rest} render={ props => (
      isAuthenticated ? (
        React.createElement(component, props)
      ) : (
        <Redirect to={{
          pathname: '/login',
          state: { from: props.location }
        }}/>
      )
    )}/>
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.isAuthenticated
})

PrivateRoute = connect(
  mapStateToProps
)(PrivateRoute)

export default PrivateRoute;
