import books from '../__mocks__/books'
import booksHistory from '../__mocks__/history/books'
import articlesHistory from '../__mocks__/history/articles'
import quotesHistory from '../__mocks__/history/quotes'
import articles from '../__mocks__/articles'
import quotes from '../__mocks__/quotes'
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

export const fetchQuotesHistory = () =>
  serverDelay(2000).then(() => {
    return quotesHistory;
  });
