import React from 'react';
// import { connect } from 'react-redux';
import isEmpty from 'validator/lib/isEmpty';
import matches from 'validator/lib/matches';
import escape from 'validator/lib/escape';

import AddBookForm from '../../components/forms/AddBook';

class AddBook extends React.Component {

  /**
   * Class constructor.
   */
  constructor(props) {
    super(props);

    // set the initial component state
    this.state = {
      errors: {},
      book: {
        title: '',
        author: '',
        rating: 0,
        comments: ''
      }
    };

    this.processForm = this.processForm.bind(this);
    this.updateForm = this.updateForm.bind(this);
    this.updateRating = this.updateRating.bind(this);
  }

  /**
   * Process the form
   *
   * @param {object} event - the JavaScript event object
   */
  processForm(event) {
    // prevent default action i.e. the form submission event
    event.preventDefault();

    let validatedForm = this.validateBook(this.state.book);

    if (validatedForm.isValid) {
      // proceed with submission
      this.submitForm()
        .then(book => {
          this.setState({
            errors: {}
          });
          console.log('Book was successfully added to your history');
          // dispatch action to add book to history
          // this.props.authenticate();
        })
        .catch(errors => {
          this.setState({
            errors
          });
        })
    } else {
      this.setState({errors: validatedForm.errors})
    }
  }

  /**
   * Update the book object
   *
   * @param {object} event - the JavaScript event object
   */
  updateForm(event) {
    const field = event.target.name;
    const book = this.state.book;
    book[field] = event.target.value;

    this.setState({book});
  }

  /**
   * Update the book's rating value
   *
   * @param {object} event - the JavaScript event object
   */
  updateRating(event, value) {
    const book = this.state.book;
    book.rating = value;
    this.setState({book})
  }

  /**
   * Submit the form to be processed by the server
   */
  submitForm() {
    return new Promise((resolve, reject) => {
      // Create a copy of the book to modify any book values
      // before submitting the form
      const book = Object.assign({}, this.state.book);

      // Sanitize the comments
      book.comments = escape(book.comments);
      const xhr = new XMLHttpRequest();

      xhr.open('post', '/api/books');
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.responseType = 'json';
      xhr.addEventListener('load', () => {
        if (xhr.status === 200) {
          resolve(xhr.response.book)
        } else {
          const errors = xhr.response.errors ? xhr.response.errors : {};
          errors.summary = xhr.response.message;
          reject(errors)
        }
      });
      xhr.send(JSON.stringify(book));
    });
  }

  /**
   * Validate a book's information
   *
   * @param {object} book
   * @return {object}
   */
  validateBook(book) {
    const errors = {};
    let isFormValid = true;

    if (isEmpty(book.title)) {
      errors.title = 'Please provide the book\'s title';
    } else {
      if (!matches(book.title, /^[A-Za-z\u0080-\u00FF ]+$/)) {
        errors.title = 'Please use only letters and spaces';
      }
    }

    if (isEmpty(book.author)) {
      errors.author = 'Please provide the book\'s author';
    } else {
      if (!matches(book.author, /^[A-Za-z\u0080-\u00FF ]+$/)) {
        errors.author = 'Please use only letters and spaces';
      }
    }

    if (errors.title || errors.author) {
      isFormValid = false;
      errors.summary = 'Unable to submit form. Please check the form for errors.';
    }

    return {isValid: isFormValid, errors};
  }

  /**
   * Render the component.
   */
  render() {
    return (<AddBookForm onSubmit={this.processForm}
                         onChange={this.updateForm}
                         onSliderChange={this.updateRating}
                         errors={this.state.errors}
                         book={this.state.book}/>);
  }
}

// AddBook = connect(
//   { authenticate }
// )(AddBook)

export default AddBook;
