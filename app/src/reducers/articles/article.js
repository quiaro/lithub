import { handleAction } from 'redux-actions';

const article = handleAction('ARTICLE/FETCH_DONE', (state, action) => (
  action.payload.entities.articles[action.payload.result]
), {});

export default article;
