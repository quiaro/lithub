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
const byId = handleAction('ARTICLE/FETCH_DONE', {
  next: (state, action) => action.payload.entities.articles
}, {});

const allIds = handleAction('ARTICLE/FETCH_DONE', {
  next: (state, action) => action.payload.result
}, []);

const isFetching = handleActions({
  'ARTICLE_FETCH': (state, action) => true,
  'ARTICLE/FETCH_DONE': (state, action) => false
}, false);

const articles = combineReducers({
  byId,
  allIds,
  isFetching
});

export default articles
