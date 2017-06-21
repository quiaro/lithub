import React from 'react';
import isEmpty from 'validator/lib/isEmpty';
import matches from 'validator/lib/matches';
import escape from 'validator/lib/escape';
import * as apiBookHistory from '../../api/book-history';
import { ratingScale } from '../../common/utils';

function withBookForm(WrappedComponent, apiMethod) {

  return class extends React.Component {

    /**
     * Process the form
     *
     * @param {object} event - the JavaScript event object
     */
    processForm(event) {
      // prevent default action i.e. the form submission event
      event.preventDefault();

      let validatedForm = this.validateForm();

      if (validatedForm.isValid) {
        apiBookHistory[apiMethod](validatedForm.payload).then((review) => {
          // Dispatch action to add review to history
          this.props[apiMethod](review);
          this.setState({ errors: {} });
          this.props.history.push('/history/books');
        })
        .catch(error => {
          if (error.code === 401) {
            // User is not authorized to perform this request. The token is
            // invalid so the user should log in again to get a new one.
            this.props.history.push('/logout');
          } else {
            this.setState({ errors: { summary: error.message } });
          }
        })
      } else {
        this.setState({errors: validatedForm.errors})
      }
    }

    /**
     * Update a field value in the form
     *
     * @param {object} event - the JavaScript event object
     */
    updateForm(event) {
      const field = event.target.name;
      const newValue = event.target.value;
      this.setState({ [field]: newValue });
    }

    /**
     * Update the book's rating value
     *
     * @param {object} event - the JavaScript event object
     */
    updateRating(event, value) {
      this.setState({ rating: value,
                      ratingText: ratingScale[value] })
    }

    /**
     * Validate the state properties that need validating.
     *
     * @return {object} - Object with three properties:
     *                    - isValid: are all the properties valid?
     *                    - errors: dictionary of error messages (if isValid is false)
     *                    - payload: object with sanitized properties ready for submission
     */
    validateForm() {
      const errors = {};
      let isFormValid = true;

      // Create a book out of the state properties (minus the errors) which could then
      // be modified if necessary before submitting the form (e.g. sanitize content)
      const payload = Object.assign({}, this.state);
      delete payload.errors;

      if (isEmpty(payload.title)) {
        errors.title = 'Please provide the book\'s title';
      } else {
        if (!matches(payload.title, /^[0-9A-Za-z\u0080-\u00FF ]+$/)) {
          errors.title = 'Please use only letters, spaces and numbers';
        }
      }

      if (isEmpty(payload.author)) {
        errors.author = 'Please provide the book\'s author';
      } else {
        if (!matches(payload.author, /^[A-Za-z\u0080-\u00FF ]+$/)) {
          errors.author = 'Please use only letters and spaces';
        }
      }

      if (errors.title || errors.author) {
        isFormValid = false;
        errors.summary = 'Unable to submit form. Please check the form for errors.';
      } else {
        // Sanitize properties -do it only if no errors were found; otherwise, it's
        // not necessary because the object should not be submitted while there are errors.
        payload.comments = escape(payload.comments);
      }

      return {isValid: isFormValid, errors, payload};
    }

    /**
     * Render the component.
     */
    render() {
      return (<WrappedComponent processForm={this.processForm}
                                updateForm={this.updateForm}
                                updateRating={this.updateRating}
                                validateForm={this.validateForm}
                                history={this.props.history}
                                match={this.props.match} />);
    }
  }
}

export default withBookForm;
