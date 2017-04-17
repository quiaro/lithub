import { normalize, schema } from 'normalizr';
import { createActions } from 'redux-actions';
import * as apiQuoteHistory from '../api/quote-history'

const reviewSchema = new schema.Entity('reviews', {}, { idAttribute: '_id' });

const actions = createActions({
  QUOTE_HISTORY: {
    FETCH_DONE: response => normalize(response, [ reviewSchema ]),
    ADD: response => normalize(response, reviewSchema),
    EDIT: response => normalize(response, reviewSchema),
    REMOVE: response => normalize(response, reviewSchema),
  }
}, 'QUOTE_HISTORY_FETCH');

export const fetch = () => (dispatch) => {
  dispatch(actions.quoteHistoryFetch());
  return apiQuoteHistory.fetch().then(response => {
      dispatch(actions.quoteHistory.fetchDone(response))
    },
    error => {
      dispatch(actions.quoteHistory.fetchDone(error));
    });
}

/**
 * Add a quote review to a user's quote history
 */
export const add = (review) => (dispatch) => {
  dispatch(actions.quoteHistory.add(review));
}

/**
 * Edit a quote review in a user's quote history
 */
export const edit = (review) => (dispatch) => {
  dispatch(actions.quoteHistory.edit(review));
}

/**
 * Remove a quote review from a user's quote history
 */
export const remove = (review) => (dispatch) => {
  dispatch(actions.quoteHistory.remove(review));
}
