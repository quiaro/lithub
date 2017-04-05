import { createActions } from 'redux-actions';
import * as apiUsers from '../api/users'

const actions = createActions('CURRENT_USER_FETCH_DONE');

export const fetchCurrentUser = () => (dispatch) => {
  return apiUsers.fetchCurrentUser().then(response => {
      dispatch(actions.currentUserFetchDone(response))
    });
}
