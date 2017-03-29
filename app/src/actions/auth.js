import { createActions } from 'redux-actions';

const actions = createActions('AUTHENTICATE', 'LOG_OUT');

export const authenticate = () => (dispatch) => {
  dispatch(actions.authenticate());
}

export const logOut = () => (dispatch) => {
  dispatch(actions.logOut());
}
