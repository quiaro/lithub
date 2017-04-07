import {combineReducers} from 'redux';
import { handleAction, handleActions } from 'redux-actions';

import review from './review';
/*
 * ----- SELECTORS
 */
export const getAll = (state) => state.allIds.map(id => state.byId[id]);
export const getIsFetching = (state) => state.isFetching;

export const getAllHistory = (state) => state.historyAllIds.map(id => state.historyById[id]);
export const getIsFetchingHistory = (state) => state.isFetchingHistory;

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
  'BOOK/ADD_TO_HISTORY': (state, action) => ({
    ...state,
    [action.payload.result]: review(state, action)
  })
}, {});

const historyAllIds = handleActions({
  'BOOK/HISTORY_FETCH_DONE': {
    next: (state, action) => action.payload.result
  },
  'BOOK/ADD_TO_HISTORY': (state, action) => ([...state, action.payload.result])
}, []);

const isFetchingHistory = handleActions({
  'BOOK_HISTORY_FETCH': (state, action) => true,
  'BOOK/HISTORY_FETCH_DONE': (state, action) => false
}, false);

const books = combineReducers({
  byId,
  allIds,
  isFetching,
  historyById,
  historyAllIds,
  isFetchingHistory
});

export default books
