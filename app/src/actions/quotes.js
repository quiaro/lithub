import { normalize, schema } from 'normalizr';
import { createActions } from 'redux-actions';
import * as api from '../api'

const quoteSchema = new schema.Entity('quotes');

const actions = createActions({
  QUOTE: {
    FETCH_DONE: response => normalize(response, [ quoteSchema ]),
    HISTORY_FETCH_DONE: response => normalize(response, [ quoteSchema ])
  }
}, 'QUOTE_FETCH', 'QUOTE_HISTORY_FETCH');

export const fetchQuotes = () => (dispatch) => {
  dispatch(actions.quoteFetch());
  return api.fetchQuotes().then(response => {
      dispatch(actions.quote.fetchDone(response))
    },
    error => {
      dispatch(actions.quote.fetchDone(error));
    });
}

export const fetchQuotesHistory = () => (dispatch) => {
  dispatch(actions.quoteHistoryFetch());
  return api.fetchQuotesHistory().then(response => {
      dispatch(actions.quote.historyFetchDone(response))
    },
    error => {
      dispatch(actions.quote.historyFetchDone(error));
    });
}
