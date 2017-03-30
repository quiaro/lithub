import { createActions } from 'redux-actions';
import * as api from '../api'

const actions = createActions('CURRENT_USER_FETCH_DONE');

export const fetchCurrentUser = (token) => (dispatch) => {
  return api.fetchCurrentUser(token).then(response => {
      dispatch(actions.currentUserFetchDone(response))
    },
    error => {
      dispatch(actions.currentUserFetchDone(error));
    });
}
