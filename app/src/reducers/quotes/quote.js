import { handleAction } from 'redux-actions';

const quote = handleAction('QUOTE/FETCH_DONE', (state, action) => (
  action.payload.entities.quotes[action.payload.result]
), {});

export default quote;
