import { normalize, schema } from 'normalizr';
import { createActions } from 'redux-actions';
import * as apiQuotes from '../api/quotes'

const quoteSchema = new schema.Entity('quotes', {}, { idAttribute: '_id' });

const actions = createActions({
  QUOTE: {
    FETCH_DONE: response => normalize(response, quoteSchema)
  },
  QUOTES: {
    FETCH_DONE: [
      (data) => normalize(data, [ quoteSchema ]),
      (data, meta) => meta
    ],
    LATEST_FETCH_DONE: response => normalize(response, [ quoteSchema ])
  }
}, 'QUOTE_FETCH', 'QUOTES_FETCH', 'QUOTES_LATEST_FETCH', 'RESET_QUOTES');

export const fetchQuote = (id) => (dispatch) => {
  dispatch(actions.quoteFetch());
  return apiQuotes.fetchQuote(id).then(response => {
      dispatch(actions.quote.fetchDone(response))
    },
    error => {
      dispatch(actions.quote.fetchDone(error));
    });
}

export const fetchReadByOthers = (start, limit) => (dispatch) => {
  // Once the start index value is -1, it means there are
  // no more results to fetch
  if (start !== -1) {
    dispatch(actions.quotesFetch());
    return apiQuotes.fetchReadByOthers(start, limit).then(response => {
        dispatch(actions.quotes.fetchDone(response.data, response.meta))
      },
      error => {
        dispatch(actions.quotes.fetchDone(error));
      });
  }
}

export const fetchLatestQuotes = () => (dispatch) => {
  dispatch(actions.quotesLatestFetch());
  return apiQuotes.fetchLatest().then(response => {
      dispatch(actions.quotes.latestFetchDone(response))
    },
    error => {
      dispatch(actions.quotes.latestFetchDone(error));
    });
}

export const resetQuotes = () => (dispatch) => {
  dispatch(actions.resetQuotes());
}
