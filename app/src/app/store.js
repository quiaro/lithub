import { createStore, applyMiddleware } from 'redux'
import reducers from '../reducers'
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk'

import { getAuthToken } from '../common/auth';

export const configure = () => {
  const middlewares = [ thunk ];
  // If the app token is present, we'll assume that the user is authenticated.
  // This will let the user access any private paths as long as no calls are
  // made to protected endpoints. Any time a protected endpoint is called, the
  // server will check the validity of the token sent with the request. If the
  // token is not valid, the response will be 401 (unauthorized) and a logout
  // action will be dispatched which will result in the user being redirected
  // to the login screen.
  const token = getAuthToken();
  const initialState = token ? { isAuthenticated: true } : undefined;

  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(createLogger());
  }

  return createStore(reducers, initialState, applyMiddleware(...middlewares));
}
