import { handleActions, combineActions } from 'redux-actions';

const review = handleActions({
  [combineActions('BOOK_HISTORY/ADD', 'BOOK_HISTORY/EDIT')](state, action) {
    return action.payload.entities.reviews[action.payload.result];
  }
}, {});

export default review;
