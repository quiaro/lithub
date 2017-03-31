import books from '../__mocks__/books'
import booksHistory from '../__mocks__/history/books'
import articlesHistory from '../__mocks__/history/books'
import articles from '../__mocks__/articles'
import quotes from '../__mocks__/quotes'
import user from '../__mocks__/user'
import { serverDelay } from '../common/utils'

export const fetchBooks = () =>
  serverDelay(2000).then(() => {
    return books;
  });

export const fetchBooksHistory = () =>
  serverDelay(2000).then(() => {
    return booksHistory;
  });

export const fetchArticles = () =>
  serverDelay(2000).then(() => {
    return articles;
  });

export const fetchArticlesHistory = () =>
  serverDelay(2000).then(() => {
    return articlesHistory;
  });

export const fetchQuotes = () =>
  serverDelay(2000).then(() => {
    return quotes;
  });

export const fetchCurrentUser = (token) =>
  serverDelay(2000).then(() => {
    return user;
  });
