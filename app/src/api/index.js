import books from '../__mocks__/books'
import { serverDelay } from '../common/utils'

export const fetchBooks = () =>
  serverDelay(2000).then(() => {
    return books;
  });
