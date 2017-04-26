import { combineReducers } from 'redux';
import { handleAction, handleActions } from 'redux-actions';

import book from './book';
/*
 * ----- SELECTORS
 */
export const getAll = (state) => state.allIds.map(id => state.byId[id]);
export const get = (state, id) => state.byId[id];
export const getLatest = (state) => state.latestAllIds.map(id => state.latestById[id]);
export const getIsFetchingBook = (state) => state.isFetchingBook;
export const getIsFetchingBooks = (state) => state.isFetching;
export const getIsFetchingLatest = (state) => state.isFetchingLatest;
export const getBooksNextIndex = (state) => state.booksNextIndex;

/*
 * ----- REDUCERS
 */

/*
 * === Books Read by Others
 */
const byId = handleActions({
  'BOOKS/FETCH_DONE': (state, action) => {
    // Merge in the result to the previous state
    return Object.assign({}, state, action.payload.entities.books);
  },
  // When the API fetches books read by others, these won't include all
  // the review details. When a specific book is fetched, these details will
  // be included. The previous book object in the state will be substituted
  // with this detailed one.
  'BOOK/FETCH_DONE': (state, action) => ({
      ...state,
      [action.payload.result]: book(state, action)
    }),
  'RESET_BOOKS': (state, action) => ({})
}, {});

const allIds = handleActions({
  'BOOKS/FETCH_DONE': (state, action) => {
    // Merge in the result to the previous state
    return state.concat(action.payload.result);
  },
  'BOOK/FETCH_DONE': (state, action) => {
    // Do not add key if it already exists
    const result = new Set([...state, action.payload.result]);
    return [...result];
  },
  'RESET_BOOKS': (state, action) => ([])
}, []);

const booksNextIndex = handleActions({
  'BOOKS/FETCH_DONE': (state, action) => action.meta.start,
  'RESET_BOOKS': (state, action) => 0
}, 0)

const isFetching = handleActions({
  'BOOKS_FETCH': (state, action) => true,
  'BOOKS/FETCH_DONE': (state, action) => false
}, false);

const isFetchingBook = handleActions({
  'BOOK_FETCH': (state, action) => true,
  'BOOK/FETCH_DONE': (state, action) => false
}, false);

/*
 * === Latest Books
 */
const latestById = handleAction('BOOKS/LATEST_FETCH_DONE',
  (state, action) => (action.payload.entities.books || {}), {});

const latestAllIds = handleAction('BOOKS/LATEST_FETCH_DONE',
  (state, action) => action.payload.result, []);

const isFetchingLatest = handleActions({
  'BOOKS_LATEST_FETCH': (state, action) => true,
  'BOOKS/LATEST_FETCH_DONE': (state, action) => false
}, false);


const books = combineReducers({
  byId,
  allIds,
  booksNextIndex,
  isFetching,
  isFetchingBook,
  isFetchingLatest,
  latestById,
  latestAllIds
});

export default books
