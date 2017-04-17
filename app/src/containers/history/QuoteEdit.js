import React from 'react';
import { connect } from 'react-redux';
import CircularProgress from 'material-ui/CircularProgress';

import { fetch, edit } from '../../actions/quote-history';
import withQuoteForm from './withQuoteForm';
import EditQuoteForm from '../../components/history/QuoteEdit';
import * as selectors from '../../reducers'

class EditQuote extends React.Component {

  constructor(props) {
    super(props);
    // Default state. Should be merged with the quote object once it's
    // available.
    this.state = Object.assign({
      errors: {},
      quote: '',
      author: '',
      comments: ''
    }, props.quote);

    // Bind the methods from the HOC to this class so they alter this
    // class' state
    this.processForm = this.props.processForm.bind(this);
    this.updateForm = this.props.updateForm.bind(this);
    this.validateForm = this.props.validateForm.bind(this);
  }

  componentDidMount() {
    const { wasHistoryFetched, fetch } = this.props;

    // If the quote history hasn't been loaded into the store, a request
    // is made to load it. The quote history should include the quote that is
    // going to be edited.
    if (!wasHistoryFetched) {
      fetch();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.quote &&
        (!this.props.quote || this.props.quote._id !== nextProps.quote._id)) {
          this.setState(nextProps.quote);
        }
  }

  /**
   * Render the component.
   */
  render() {
    const { wasHistoryFetched, isFetchingQuoteHistory, history } = this.props;

    if (!wasHistoryFetched && !isFetchingQuoteHistory) {
      // Do not render anything if the quote history has not been fetched
      // and we're not in the process of loading it.
      return null;
    }

    if (isFetchingQuoteHistory) {
      // Show loading spinner if the quote history is being loaded
      return <CircularProgress size={60} thickness={7} />
    }

    return (<EditQuoteForm onSubmit={this.processForm}
                           onChange={this.updateForm}
                           history={history}
                           state={this.state} />);
  }
}

const mapStateToProps = (state, props) => ({
  quote: selectors.getQuoteFromHistory(state, props.match.params.id),
  isFetchingQuoteHistory: selectors.getIsFetchingQuoteHistory(state),
  wasHistoryFetched: selectors.getWasQuoteHistoryFetched(state)
})

// Connect component to redux store and add props to it
EditQuote = connect(mapStateToProps, { edit, fetch })(EditQuote);

// Extend component with functions from an HOC
EditQuote = withQuoteForm(EditQuote, 'edit');

export default EditQuote;
