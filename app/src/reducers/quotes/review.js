import { handleActions, combineActions } from 'redux-actions';

const review = handleActions({
  [combineActions('QUOTE_HISTORY/ADD', 'QUOTE_HISTORY/EDIT')](state, action) {
    return action.payload.entities.reviews[action.payload.result];
  }
}, {});

export default review;
