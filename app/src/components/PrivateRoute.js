import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = (props) => {
  const { component, isAuthenticated, ...rest} = props;
  return <Route {...rest} render={ routeProps => (
    isAuthenticated ? (
      React.createElement(component, routeProps)
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: routeProps.location }
      }}/>
    )
  )}/>
}

export default PrivateRoute;
