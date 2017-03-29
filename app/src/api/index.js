import books from '../__mocks__/books'
import articles from '../__mocks__/articles'
import quotes from '../__mocks__/quotes'
import { serverDelay } from '../common/utils'

export const fetchBooks = () =>
  serverDelay(2000).then(() => {
    return books;
  });

export const fetchArticles = () =>
  serverDelay(2000).then(() => {
    return articles;
  });

export const fetchQuotes = () =>
  serverDelay(2000).then(() => {
    return quotes;
  });
