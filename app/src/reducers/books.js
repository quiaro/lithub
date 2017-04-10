import {combineReducers} from 'redux';
import { handleAction, handleActions, combineActions } from 'redux-actions';

import review from './review';
/*
 * ----- SELECTORS
 */
export const getAllReadByOthers = (state) => state.readByOthersAllIds.map(id => state.readByOthersById[id]);
export const getIsFetchingReadByOthers = (state) => state.isFetchingReadByOthers;

export const getAllHistory = (state) => state.historyAllIds.map(id => state.historyById[id]);
export const getIsFetchingHistory = (state) => state.isFetchingHistory;
export const getWasHistoryFetched = (state) => state.wasHistoryFetched;
export const getBook = (state, id) => state.historyById[id];

/*
 * ----- REDUCERS
 */

/*
 * State for Books Read by Others
 */
const readByOthersById = handleAction('BOOK/BY_OTHERS_FETCH_DONE', {
  next: (state, action) => {
    if (action.meta.limit === action.meta.start) {
      // Results correspond to the first page so set the state
      // to the current result
      return action.payload.entities.books || {};
    }
    // Merge in the result to the previous state
    return Object.assign({}, ...state, action.payload.entities.books);
  }
}, {});

const readByOthersAllIds = handleAction('BOOK/BY_OTHERS_FETCH_DONE', {
  next: (state, action) => {
    if (action.meta.limit === action.meta.start) {
      // Results correspond to the first page so set the state
      // to the current result
      return action.payload.result;
    }
    // Merge in the result to the previous state
    return [...state, action.payload.result]
  }
}, []);

const readByOthersPageStart = handleAction('BOOK/BY_OTHERS_FETCH_DONE',
  (state, action) => action.meta.start, 0)

const isFetchingReadByOthers = handleActions({
  'BOOK_BY_OTHERS_FETCH': (state, action) => true,
  'BOOK/BY_OTHERS_FETCH_DONE': (state, action) => false
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
  isFetchingReadByOthers,
  readByOthersPageStart,
  historyById,
  historyAllIds,
  isFetchingHistory,
  wasHistoryFetched
});

export default books
