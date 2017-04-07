import { normalize, schema } from 'normalizr';
import { createActions } from 'redux-actions';
import * as api from '../api'
import * as apiBooks from '../api/books'

const bookSchema = new schema.Entity('books');
const reviewSchema = new schema.Entity('reviews', {}, { idAttribute: '_id' });

const actions = createActions({
  BOOK: {
    FETCH_DONE: response => normalize(response, [ bookSchema ]),
    HISTORY_FETCH_DONE: response => normalize(response, [ reviewSchema ]),
    ADD_TO_HISTORY: response => normalize(response, reviewSchema)
  }
}, 'BOOK_FETCH', 'BOOK_HISTORY_FETCH');

export const fetchBooks = () => (dispatch) => {
  dispatch(actions.bookFetch());
  return api.fetchBooks().then(response => {
      dispatch(actions.book.fetchDone(response))
    },
    error => {
      dispatch(actions.book.fetchDone(error));
    });
}

/**
 * Get user's book history
 */
export const fetchBookHistory = () => (dispatch) => {
  dispatch(actions.bookHistoryFetch());
  return apiBooks.fetchHistory().then(response => {
      dispatch(actions.book.historyFetchDone(response))
    },
    error => {
      dispatch(actions.book.historyFetchDone(error));
    });
}

/**
 * Add a book review to a user's book history
 */
export const addBookToHistory = (review) => (dispatch) => {
  dispatch(actions.book.addToHistory(review));
}
