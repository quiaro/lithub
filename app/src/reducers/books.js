import {combineReducers} from 'redux';
import { handleAction, handleActions, combineActions } from 'redux-actions';

import book from './book';
import review from './review';
/*
 * ----- SELECTORS
 */
export const getAllHistory = (state) => state.historyAllIds.map(id => state.historyById[id]);
export const getAllReadByOthers = (state) => state.readByOthersAllIds.map(id => state.readByOthersById[id]);
export const getBook = (state, id) => state.readByOthersById[id];
export const getFromHistory = (state, id) => state.historyById[id];
export const getIsFetchingBook = (state) => state.isFetchingBook;
export const getIsFetchingHistory = (state) => state.isFetchingHistory;
export const getIsFetchingReadByOthers = (state) => state.isFetchingReadByOthers;
export const getWasHistoryFetched = (state) => state.wasHistoryFetched;

/*
 * ----- REDUCERS
 */

/*
 * State for Books Read by Others
 */
const readByOthersById = handleActions({
  'BOOK/BY_OTHERS_FETCH_DONE': (state, action) => {
    if (action.meta.limit === action.meta.start) {
      // Results correspond to the first page so set the state
      // to the current result
      return action.payload.entities.books || {};
    }
    // Merge in the result to the previous state
    return Object.assign({}, ...state, action.payload.entities.books);
  },
  // When the API fetches books read by others, these won't include all
  // the review details. When a specific book is fetched, these details will
  // be included. The previous book object in the state will be substituted
  // with this detailed one.
  'BOOK/FETCH_DONE': (state, action) => ({
      ...state,
      [action.payload.result]: book(state, action)
    })
}, {});

const readByOthersAllIds = handleActions({
  'BOOK/BY_OTHERS_FETCH_DONE': (state, action) => {
    if (action.meta.limit === action.meta.start) {
      // Results correspond to the first page so set the state
      // to the current result
      return action.payload.result;
    }
    // Merge in the result to the previous state
    return [...state, action.payload.result]
  },
  'BOOK/FETCH_DONE': (state, action) => {
    // Do not add key if it already exists
    const result = new Set([...state, action.payload.result]);
    return [...result];
  }
}, []);

const readByOthersPageStart = handleAction('BOOK/BY_OTHERS_FETCH_DONE',
  (state, action) => action.meta.start, 0)

const isFetchingReadByOthers = handleActions({
  'BOOK_BY_OTHERS_FETCH': (state, action) => true,
  'BOOK/BY_OTHERS_FETCH_DONE': (state, action) => false
}, false);

const isFetchingBook = handleActions({
  'BOOK_FETCH': (state, action) => true,
  'BOOK/FETCH_DONE': (state, action) => false
}, false);

/*
 * State for Books History
 */
const historyById = handleActions({
  'BOOK/HISTORY_FETCH_DONE': {
    next: (state, action) => (action.payload.entities.reviews || {})
  },
  [combineActions('BOOK/ADD_TO_HISTORY', 'BOOK/EDIT_IN_HISTORY')](state, action) {
    return {
      ...state,
      [action.payload.result]: review(state, action)
    };
  },
  'BOOK/DELETE_FROM_HISTORY': (state, action) => {
    // Remove key from copied state
    const newState = { ...state };
    delete newState[action.payload.result];
    return newState;
  },
  'LOG_OUT': (state, action) => ({})
}, {});

const historyAllIds = handleActions({
  'BOOK/HISTORY_FETCH_DONE': {
    next: (state, action) => action.payload.result
  },
  'BOOK/ADD_TO_HISTORY': (state, action) => ([...state, action.payload.result]),
  'BOOK/DELETE_FROM_HISTORY': (state, action) => {
    // Return all ids minus the one of the review that is being deleted
    return state.filter(id => id !== action.payload.result);
  },
  'LOG_OUT': (state, action) => ([])
}, []);

const isFetchingHistory = handleActions({
  'BOOK_HISTORY_FETCH': (state, action) => true,
  'BOOK/HISTORY_FETCH_DONE': (state, action) => false
}, false);

const wasHistoryFetched = handleActions({
  'BOOK/HISTORY_FETCH_DONE': (state, action) => true,
  'LOG_OUT': (state, action) => false
}, false);

const books = combineReducers({
  readByOthersById,
  readByOthersAllIds,
  isFetchingBook,
  isFetchingReadByOthers,
  readByOthersPageStart,
  historyById,
  historyAllIds,
  isFetchingHistory,
  wasHistoryFetched
});

export default books
