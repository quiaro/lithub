import React from 'react';
// import { connect } from 'react-redux';
import isEmpty from 'validator/lib/isEmpty';
import matches from 'validator/lib/matches';
import escape from 'validator/lib/escape';
import isURL from 'validator/lib/isURL';

import AddArticleForm from '../../components/forms/AddArticle';

class AddArticle extends React.Component {

  /**
   * Class constructor.
   */
  constructor(props) {
    super(props);

    // set the initial component state
    this.state = {
      errors: {},
      article: {
        title: '',
        author: '',
        link: '',
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

    let validatedForm = this.validateArticle(this.state.article);

    if (validatedForm.isValid) {
      // proceed with submission
      this.submitForm()
        .then(article => {
          this.setState({
            errors: {}
          });
          console.log('Article was successfully added to your history');
          // dispatch action to add article to history
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
    const article = this.state.article;
    article[field] = event.target.value;

    this.setState({article});
  }

  /**
   * Update the article's rating value
   *
   * @param {object} event - the JavaScript event object
   */
  updateRating(event, value) {
    const article = this.state.article;
    article.rating = value;
    this.setState({article})
  }

  /**
   * Submit the form to be processed by the server
   */
  submitForm() {
    return new Promise((resolve, reject) => {
      // Create a copy of the article to modify any article values
      // before submitting the form
      const article = Object.assign({}, this.state.article);

      // Sanitize the comments
      article.comments = escape(article.comments);
      const xhr = new XMLHttpRequest();

      xhr.open('post', '/api/articles');
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.responseType = 'json';
      xhr.addEventListener('load', () => {
        if (xhr.status === 200) {
          resolve(xhr.response.article)
        } else {
          const errors = xhr.response.errors ? xhr.response.errors : {};
          errors.summary = xhr.response.message;
          reject(errors)
        }
      });
      xhr.send(JSON.stringify(article));
    });
  }

  /**
   * Validate an article's information
   *
   * @param {object} article
   * @return {object}
   */
  validateArticle(article) {
    const errors = {};
    let isFormValid = true;

    if (isEmpty(article.title)) {
      errors.title = 'Please provide the article\'s title';
    } else {
      if (!matches(article.title, /^[A-Za-z\u0080-\u00FF ]+$/)) {
        errors.title = 'Please use only letters and spaces';
      }
    }

    if (isEmpty(article.author)) {
      errors.author = 'Please provide the article\'s author';
    } else {
      if (!matches(article.author, /^[A-Za-z\u0080-\u00FF ]+$/)) {
        errors.author = 'Please use only letters and spaces';
      }
    }

    if (!isEmpty(article.link) && !isURL(article.link)) {
      errors.link = 'Please provide a valid URL value';
    }

    if (errors.title || errors.author || errors.link) {
      isFormValid = false;
      errors.summary = 'Unable to submit form. Please check the form for errors.';
    }

    return {isValid: isFormValid, errors};
  }

  /**
   * Render the component.
   */
  render() {
    return (<AddArticleForm
               onSubmit={this.processForm}
               onChange={this.updateForm}
               onSliderChange={this.updateRating}
               errors={this.state.errors}
               article={this.state.article}/>);
  }
}

// AddArticle = connect(
//   { authenticate }
// )(AddArticle)

export default AddArticle;
