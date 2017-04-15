import { normalize, schema } from 'normalizr';
import { createActions } from 'redux-actions';
import * as apiArticleHistory from '../api/article-history'

const reviewSchema = new schema.Entity('reviews', {}, { idAttribute: '_id' });

const actions = createActions({
  ARTICLE_HISTORY: {
    FETCH_DONE: response => normalize(response, [ reviewSchema ]),
    ADD: response => normalize(response, reviewSchema),
    EDIT: response => normalize(response, reviewSchema),
    REMOVE: response => normalize(response, reviewSchema),
  }
}, 'ARTICLE_HISTORY_FETCH');

export const fetch = () => (dispatch) => {
  dispatch(actions.articleHistoryFetch());
  return apiArticleHistory.fetch().then(response => {
      dispatch(actions.articleHistory.fetchDone(response))
    },
    error => {
      dispatch(actions.articleHistory.fetchDone(error));
    });
}

/**
 * Add a book review to a user's book history
 */
export const add = (review) => (dispatch) => {
  dispatch(actions.articleHistory.add(review));
}

/**
 * Edit a book review in a user's book history
 */
export const edit = (review) => (dispatch) => {
  dispatch(actions.articleHistory.edit(review));
}

/**
 * Remove a book review from a user's book history
 */
export const remove = (review) => (dispatch) => {
  dispatch(actions.articleHistory.remove(review));
}
