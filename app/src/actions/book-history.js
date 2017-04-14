import { normalize, schema } from 'normalizr';
import { createActions } from 'redux-actions';
import * as apiBookHistory from '../api/book-history'

const reviewSchema = new schema.Entity('reviews', {}, { idAttribute: '_id' });

const actions = createActions({
  BOOK_HISTORY: {
    FETCH_DONE: response => normalize(response, [ reviewSchema ]),
    ADD: response => normalize(response, reviewSchema),
    EDIT: response => normalize(response, reviewSchema),
    REMOVE: response => normalize(response, reviewSchema),
  }
}, 'BOOK_HISTORY_FETCH');

export const fetch = () => (dispatch) => {
  dispatch(actions.bookHistoryFetch());
  return apiBookHistory.fetch().then(response => {
      dispatch(actions.bookHistory.fetchDone(response))
    },
    error => {
      dispatch(actions.bookHistory.fetchDone(error));
    });
}

/**
 * Add a book review to a user's book history
 */
export const add = (review) => (dispatch) => {
  dispatch(actions.bookHistory.add(review));
}

/**
 * Edit a book review in a user's book history
 */
export const edit = (review) => (dispatch) => {
  dispatch(actions.bookHistory.edit(review));
}

/**
 * Remove a book review from a user's book history
 */
export const remove = (review) => (dispatch) => {
  dispatch(actions.bookHistory.remove(review));
}
