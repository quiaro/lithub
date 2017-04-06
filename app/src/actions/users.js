import { createActions } from 'redux-actions';
import { logOut } from './auth';
import * as apiUsers from '../api/users'

const actions = createActions('CURRENT_USER_FETCH_DONE');

export const fetchCurrentUser = () => (dispatch) => {
  return apiUsers.fetchCurrentUser().then(response => {
      dispatch(actions.currentUserFetchDone(response))
    })
    .catch(error => {
      if (error.code === 401) {
        logOut()(dispatch);
      }
    })
}
