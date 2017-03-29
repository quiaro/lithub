import {combineReducers} from 'redux';
import { handleAction, handleActions } from 'redux-actions';

/*
 * ----- SELECTORS
 */
export const getAll = (state) => state.allIds.map(id => state.byId[id]);

export const getIsFetching = (state) => state.isFetching;

/*
 * ----- REDUCERS
 */
const byId = handleAction('BOOK/FETCH_DONE', {
  next: (state, action) => action.payload.entities.books
}, {});

const allIds = handleAction('BOOK/FETCH_DONE', {
  next: (state, action) => action.payload.result
}, []);

const isFetching = handleActions({
  'BOOK_FETCH': (state, action) => true,
  'BOOK/FETCH_DONE': (state, action) => false
}, false);

const books = combineReducers({
  byId,
  allIds,
  isFetching
});

export default books
