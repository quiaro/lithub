import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = (props) => {
  const { component, isAuthenticated, path, ...rest} = props;
  return <Route path={path} render={ routeProps => (
    isAuthenticated ? (
      React.createElement(component, Object.assign({}, rest, routeProps))
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: routeProps.location }
      }}/>
    )
  )}/>
}

export default PrivateRoute;
