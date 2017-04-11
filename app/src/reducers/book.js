import { handleAction } from 'redux-actions';

const book = handleAction('BOOK/FETCH_DONE', (state, action) => (
  action.payload.entities.books[action.payload.result]
), {});

export default book;
