import {combineReducers} from 'redux';
import { handleAction, handleActions, combineActions } from 'redux-actions';

import review from './review';
/*
 * ----- SELECTORS
 */
export const getAll = (state) => state.allIds.map(id => state.byId[id]);
export const getIsFetching = (state) => state.isFetching;

export const getAllHistory = (state) => state.historyAllIds.map(id => state.historyById[id]);
export const getIsFetchingHistory = (state) => state.isFetchingHistory;
export const getWasHistoryFetched = (state) => state.wasHistoryFetched;
export const getBook = (state, id) => state.historyById[id];

/*
 * ----- REDUCERS
 */
const byId = handleAction('BOOK/FETCH_DONE', {
  next: (state, action) => (action.payload.entities.books || {})
}, {});

const allIds = handleAction('BOOK/FETCH_DONE', {
  next: (state, action) => action.payload.result
}, []);

const isFetching = handleActions({
  'BOOK_FETCH': (state, action) => true,
  'BOOK/FETCH_DONE': (state, action) => false
}, false);

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
  }
}, {});

const historyAllIds = handleActions({
  'BOOK/HISTORY_FETCH_DONE': {
    next: (state, action) => action.payload.result
  },
  'BOOK/ADD_TO_HISTORY': (state, action) => ([...state, action.payload.result]),
  'BOOK/DELETE_FROM_HISTORY': (state, action) => {
    // Return all ids minus the one of the review that is being deleted
    return state.filter(id => id !== action.payload.result);
  }
}, []);

const isFetchingHistory = handleActions({
  'BOOK_HISTORY_FETCH': (state, action) => true,
  'BOOK/HISTORY_FETCH_DONE': (state, action) => false
}, false);

const wasHistoryFetched = handleAction('BOOK/HISTORY_FETCH_DONE', (state, action) => true, false);

const books = combineReducers({
  byId,
  allIds,
  isFetching,
  historyById,
  historyAllIds,
  isFetchingHistory,
  wasHistoryFetched
});

export default books
