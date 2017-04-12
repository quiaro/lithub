import { normalize, schema } from 'normalizr';
import { createActions } from 'redux-actions';
import * as apiBooks from '../api/books'

const bookSchema = new schema.Entity('books', {}, { idAttribute: '_id' });
const reviewSchema = new schema.Entity('reviews', {}, { idAttribute: '_id' });

const actions = createActions({
  BOOK: {
    FETCH_DONE: response => normalize(response, bookSchema),
    BY_OTHERS_FETCH_DONE: [
      (data) => normalize(data, [ bookSchema ]),
      (data, meta) => meta
    ],
    HISTORY_FETCH_DONE: response => normalize(response, [ reviewSchema ]),
    ADD_TO_HISTORY: response => normalize(response, reviewSchema),
    EDIT_IN_HISTORY: response => normalize(response, reviewSchema),
    DELETE_FROM_HISTORY: response => normalize(response, reviewSchema),
    LATEST_FETCH_DONE: response => normalize(response, [ bookSchema ])
  }
}, 'BOOK_BY_OTHERS_FETCH', 'RESET_READ_BY_OTHERS', 'BOOK_HISTORY_FETCH', 'BOOK_FETCH', 'BOOK_LATEST_FETCH');

export const fetchBook = (id) => (dispatch) => {
  dispatch(actions.bookFetch());
  return apiBooks.fetchBook(id).then(response => {
      dispatch(actions.book.fetchDone(response))
    },
    error => {
      dispatch(actions.book.fetchDone(error));
    });
}

export const fetchLatestBooks = () => (dispatch) => {
  dispatch(actions.bookLatestFetch());
  return apiBooks.fetchLatest().then(response => {
      dispatch(actions.book.latestFetchDone(response))
    },
    error => {
      dispatch(actions.book.latestFetchDone(error));
    });
}

export const resetReadByOthers = () => (dispatch) => {
  dispatch(actions.resetReadByOthers());
}

export const fetchReadByOthers = (start, limit) => (dispatch) => {
  // Once the start index value is -1, it means there are
  // no more results to fetch
  if (start !== -1) {
    dispatch(actions.bookByOthersFetch());
    return apiBooks.fetchReadByOthers(start, limit).then(response => {
        dispatch(actions.book.byOthersFetchDone(response.data, response.meta))
      },
      error => {
        dispatch(actions.book.byOthersFetchDone(error));
      });
  }
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
