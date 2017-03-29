import { handleActions } from 'redux-actions';

/*
 * ----- REDUCERS
 */
const isAuthenticated = handleActions({
  'AUTHENTICATE': (state, action) => true,
  'LOG_OUT': (state, action) => false
}, false);

export default isAuthenticated;
