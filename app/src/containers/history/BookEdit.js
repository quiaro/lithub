import React from 'react';
import { connect } from 'react-redux';
import CircularProgress from 'material-ui/CircularProgress';

import { fetch, edit } from '../../actions/book-history';
import withBookForm from './withBookForm';
import EditBookForm from '../../components/history/BookEdit';
import * as selectors from '../../reducers'

class EditBook extends React.Component {

  constructor(props) {
    super(props);
    // Default state. Should be merged with the book object once it's
    // available.
    this.state = Object.assign({
      errors: {},
      title: '',
      author: '',
      rating: 0,
      comments: ''
    }, props.book);

    // Bind the methods from the HOC to this class so they alter this
    // class' state
    this.processForm = this.props.processForm.bind(this);
    this.updateForm = this.props.updateForm.bind(this);
    this.updateRating = this.props.updateRating.bind(this);
    this.validateForm = this.props.validateForm.bind(this);
  }

  componentDidMount() {
    const { wasHistoryFetched, fetch } = this.props;

    // If the book history hasn't been loaded into the store, a request
    // is made to load it. The book history should include the book that is
    // going to be edited.
    if (!wasHistoryFetched) {
      fetch();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.book &&
        (!this.props.book || this.props.book._id !== nextProps.book._id)) {
          this.setState(nextProps.book);
        }
  }

  /**
   * Render the component.
   */
  render() {
    const { wasHistoryFetched, isFetchingBooksHistory, history } = this.props;

    if (!wasHistoryFetched && !isFetchingBooksHistory) {
      // Do not render anything if the book history has not been fetched
      // and we're not in the process of loading it.
      return null;
    }

    if (isFetchingBooksHistory) {
      // Show loading spinner if the book history is being loaded
      return <CircularProgress size={60} thickness={7} />
    }

    return (<EditBookForm onSubmit={this.processForm}
                          onChange={this.updateForm}
                          onSliderChange={this.updateRating}
                          history={history}
                          state={this.state} />);
  }
}

const mapStateToProps = (state, props) => ({
  book: selectors.getBookFromHistory(state, props.match.params.id),
  isFetchingBooksHistory: selectors.getIsFetchingBookHistory(state),
  wasHistoryFetched: selectors.getWasBookHistoryFetched(state)
})

// Connect component to redux store and add props to it
EditBook = connect(
  mapStateToProps,
  { edit, fetch }
)(EditBook);

// Extend component with functions from an HOC
EditBook = withBookForm(EditBook, 'edit');

export default EditBook;
