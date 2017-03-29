import { createStore, applyMiddleware } from 'redux'
import reducers from '../reducers'
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk'

export const configure = () => {
  const middlewares = [ thunk ];

  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(createLogger());
  }

  return createStore(reducers, {}, applyMiddleware(...middlewares));
}
