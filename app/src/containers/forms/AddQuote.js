import React from 'react';
// import { connect } from 'react-redux';
import isEmpty from 'validator/lib/isEmpty';
import matches from 'validator/lib/matches';
import escape from 'validator/lib/escape';

import AddQuoteForm from '../../components/forms/AddQuote';

class AddBook extends React.Component {

  /**
   * Class constructor.
   */
  constructor(props) {
    super(props);

    // set the initial component state
    this.state = {
      errors: {},
      quote: {
        text: '',
        author: '',
        source: '',
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

    let validatedForm = this.validateQuote(this.state.quote);

    if (validatedForm.isValid) {
      // proceed with submission
      this.submitForm()
        .then(quote => {
          this.setState({
            errors: {}
          });
          console.log('Quote was successfully added to your history');
          // dispatch action to add quote to history
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
   * Update the quote object
   *
   * @param {object} event - the JavaScript event object
   */
  updateForm(event) {
    const field = event.target.name;
    const quote = this.state.quote;
    quote[field] = event.target.value;

    this.setState({quote});
  }

  /**
   * Update the quote's rating value
   *
   * @param {object} event - the JavaScript event object
   */
  updateRating(event, value) {
    const quote = this.state.quote;
    quote.rating = value;
    this.setState({quote})
  }

  /**
   * Submit the form to be processed by the server
   */
  submitForm() {
    return new Promise((resolve, reject) => {
      // Create a copy of the quote to modify any quote values
      // before submitting the form
      const quote = Object.assign({}, this.state.quote);

      // Sanitize text fields
      quote.text = escape(quote.text);
      quote.source = escape(quote.source);
      quote.comments = escape(quote.comments);
      const xhr = new XMLHttpRequest();

      xhr.open('post', '/api/quotes');
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.responseType = 'json';
      xhr.addEventListener('load', () => {
        if (xhr.status === 200) {
          resolve(xhr.response.quote)
        } else {
          const errors = xhr.response.errors ? xhr.response.errors : {};
          errors.summary = xhr.response.message;
          reject(errors)
        }
      });
      xhr.send(JSON.stringify(quote));
    });
  }

  /**
   * Validate a quote's information
   *
   * @param {object} quote
   * @return {object}
   */
  validateQuote(quote) {
    const errors = {};
    let isFormValid = true;

    if (isEmpty(quote.text)) {
      errors.text = 'Please provide the quote\'s text';
    }

    if (!isEmpty(quote.author) && !matches(quote.author, /^[A-Za-z\u0080-\u00FF ]+$/)) {
      errors.author = 'Please use only letters and spaces';
    }

    if (errors.text || errors.author) {
      isFormValid = false;
      errors.summary = 'Unable to submit form. Please check the form for errors.';
    }

    return {isValid: isFormValid, errors};
  }

  /**
   * Render the component.
   */
  render() {
    return (<AddQuoteForm onSubmit={this.processForm}
                         onChange={this.updateForm}
                         onSliderChange={this.updateRating}
                         errors={this.state.errors}
                         quote={this.state.quote}/>);
  }
}

// AddBook = connect(
//   { authenticate }
// )(AddBook)

export default AddBook;
