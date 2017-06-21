import React from 'react';
import { connect } from 'react-redux';

import withBookForm from './withBookForm';
import { add } from '../../actions/book-history';
import AddBookForm from '../../components/history/BookAdd';
import { getQueryParam, ratingScale } from '../../common/utils';

class AddBook extends React.Component {

  constructor(props) {
    super(props);

    const searchUrl = props.history.location.search;
    const isExisting = getQueryParam(searchUrl, 'existing');
    let book = isExisting ? sessionStorage.getItem('book') : null;
    if (book) {
      book = JSON.parse(book);
    }
    // Select the value in the middle of the rating scale
    const ratingDefaultValue = Math.round(Object.keys(ratingScale).length / 2);

    this.state = {
      errors: {},
      title: book ? book.title : '',
      author: book ? book.author : '',
      rating: ratingDefaultValue,
      ratingText: ratingScale[ratingDefaultValue],
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

AddBook = connect(undefined, { add })(AddBook);
AddBook = withBookForm(AddBook, 'add');

export default AddBook;
