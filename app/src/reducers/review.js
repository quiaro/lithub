import { handleActions, combineActions } from 'redux-actions';

const review = handleActions({
  [combineActions('BOOK/ADD_TO_HISTORY', 'BOOK/EDIT_IN_HISTORY')](state, action) {
    return action.payload.entities.reviews[action.payload.result];
  }
}, {});

export default review;
