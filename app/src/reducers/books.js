import {combineReducers} from 'redux';
import { handleAction, handleActions } from 'redux-actions';

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

const historyById = handleAction('BOOK/HISTORY_FETCH_DONE', {
  next: (state, action) => (action.payload.entities.books || {})
}, {});

const historyAllIds = handleAction('BOOK/HISTORY_FETCH_DONE', {
  next: (state, action) => action.payload.result
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
