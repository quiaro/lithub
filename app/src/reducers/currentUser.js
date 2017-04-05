import { handleActions } from 'redux-actions';

/*
 * ----- REDUCERS
 */
const currentUser = handleActions({
  'CURRENT_USER_FETCH_DONE': {
    next: (state, action) => action.payload
  },
  'LOG_OUT': (state, action) => null
}, null);

export default currentUser;
