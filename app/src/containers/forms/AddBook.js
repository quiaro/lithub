import React from 'react';
import { connect } from 'react-redux';

import BookForm from './Book';
import { addBookToHistory } from '../../actions/books';
import AddBookForm from '../../components/forms/AddBook';

let AddBook = ({ processForm, updateForm, updateRating, state }) =>
  (<AddBookForm onSubmit={processForm}
                onChange={updateForm}
                onSliderChange={updateRating}
                state={state} />)

AddBook = BookForm(AddBook, {
    title: '',
    author: '',
    rating: 0,
    comments: ''
  }, 'addBookToHistory');

AddBook = connect(undefined, { addBookToHistory })(AddBook);

export default AddBook;
