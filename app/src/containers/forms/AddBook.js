import React from 'react';
import { connect } from 'react-redux';

import withBookForm from './withBookForm';
import { addBookToHistory } from '../../actions/books';
import AddBookForm from '../../components/forms/AddBook';

class AddBook extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      title: '',
      author: '',
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
