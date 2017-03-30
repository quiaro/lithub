import {combineReducers} from 'redux';
import { handleAction } from 'redux-actions';

/*
 * ----- SELECTORS
 */
export const getCurrentUser = (state) => state.currentUser;

/*
 * ----- REDUCERS
 */
const currentUser = handleAction('CURRENT_USER_FETCH_DONE', {
  next: (state, action) => action.payload
}, null);

const users = combineReducers({
  currentUser
});

export default users
