import React from 'react';
import { connect } from 'react-redux';

import withBookForm from './withBookForm';
import { addBookToHistory } from '../../actions/books';
import AddBookForm from '../../components/forms/AddBook';

class AddBook extends React.Component {

  constructor(props) {
    super(props);

    const searchUrl = props.history.location.search;
    const title = this.getQueryParam(searchUrl, 'title') || '';
    const author = this.getQueryParam(searchUrl, 'author') || '';

    this.state = {
      errors: {},
      title: title,
      author: author,
      rating: 0,
      comments: ''
    }
    // Bind the methods from the HOC to this class so they alter this
    // class' state
    this.processForm = this.props.processForm.bind(this);
    this.updateForm = this.props.updateForm.bind(this);
    this.updateRating = this.props.updateRating.bind(this);
    this.validateForm = this.props.validateForm.bind(this);
  }

  /**
   * Extract the value for a query param found in the url search string
   * @param {string} urlSearch - url search string
   * @param {string} param - param searched for
   */
  getQueryParam(urlSearch, param) {
    // Append an ampersand so it's easier to look for the param with a regex
    const str = urlSearch + "&";
    const paramRe = new RegExp(`${param}=(.*?)&`);
    const match = paramRe.exec(str);
    return match && decodeURIComponent(match[1]);
  }

  /**
   * Render the component.
   */
  render() {
    const { history } = this.props;

    return (<AddBookForm onSubmit={this.processForm}
                         onChange={this.updateForm}
                         onSliderChange={this.updateRating}
                         history={history}
                         state={this.state} />);
  }
}

AddBook = connect(undefined, { addBookToHistory })(AddBook);
AddBook = withBookForm(AddBook, 'addBookToHistory');

export default AddBook;
