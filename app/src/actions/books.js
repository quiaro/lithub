import { normalize, schema } from 'normalizr';
import { createActions } from 'redux-actions';
import * as apiBooks from '../api/books'

const bookSchema = new schema.Entity('books', {}, { idAttribute: '_id' });
const reviewSchema = new schema.Entity('reviews', {}, { idAttribute: '_id' });

const actions = createActions({
  BOOK: {
    BY_OTHERS_FETCH_DONE: [
      (data) => normalize(data, [ bookSchema ]),
      (data, meta) => meta
    ],
    HISTORY_FETCH_DONE: response => normalize(response, [ reviewSchema ]),
    ADD_TO_HISTORY: response => normalize(response, reviewSchema),
    EDIT_IN_HISTORY: response => normalize(response, reviewSchema),
    DELETE_FROM_HISTORY: response => normalize(response, reviewSchema)
  }
}, 'BOOK_BY_OTHERS_FETCH', 'BOOK_HISTORY_FETCH');

export const fetchReadByOthers = () => (dispatch) => {
  dispatch(actions.bookByOthersFetch());
  return apiBooks.fetchReadByOthers().then(response => {
      dispatch(actions.book.byOthersFetchDone(response.data, response.meta))
    },
    error => {
      dispatch(actions.book.byOthersFetchDone(error));
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

/**
 * Edit a book review in a user's book history
 */
export const editBookInHistory = (review) => (dispatch) => {
  dispatch(actions.book.editInHistory(review));
}

/**
 * Remove a book review from a user's book history
 */
export const deleteBookFromHistory = (review) => (dispatch) => {
  dispatch(actions.book.deleteFromHistory(review));
}
