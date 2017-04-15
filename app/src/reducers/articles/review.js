import { handleActions, combineActions } from 'redux-actions';

const review = handleActions({
  [combineActions('ARTICLE_HISTORY/ADD', 'ARTICLE_HISTORY/EDIT')](state, action) {
    return action.payload.entities.reviews[action.payload.result];
  }
}, {});

export default review;
