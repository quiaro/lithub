import { handleActions } from 'redux-actions';

const review = handleActions({
  'BOOK/ADD_TO_HISTORY': {
    next: (state, action) => action.payload.entities.reviews[action.payload.result]
  }
}, {});

export default review;
