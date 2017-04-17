import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetch, remove } from '../../actions/quote-history';
import * as apiQuoteHistory from '../../api/quote-history';
import CircularProgress from 'material-ui/CircularProgress';
import QuoteViewComponent from '../../components/history/QuoteView'
import * as selectors from '../../reducers'

class QuoteView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isDeleteDialogOpen: false
    }
    this.onDialogOpenHandler = this.onDialogOpenHandler.bind(this);
    this.onDialogCloseHandler = this.onDialogCloseHandler.bind(this);
    this.onDeleteHandler = this.onDeleteHandler.bind(this);
  }

  componentDidMount() {
    const { wasHistoryFetched, fetch } = this.props;

    if (!wasHistoryFetched) {
      fetch();
    }
  }

  // Delete Dialog
  onDialogOpenHandler() {
    this.setState({ isDeleteDialogOpen: true });
  }
  onDialogCloseHandler() {
    this.setState({ isDeleteDialogOpen: false })
  }

  onDeleteHandler() {
    const { quote, remove, history } = this.props;
    apiQuoteHistory.remove(quote).then(() => {
      // Dispatch action to delete quote review from history
      remove(quote);
      history.push('/history/quotes');
    })
  }

  render() {
    const { quote, isFetchingHistory, history } = this.props;

    if (isFetchingHistory) {
      // Show loading spinner if the quote history is being loaded
      return <CircularProgress size={60} thickness={7} />
    }
    return <QuoteViewComponent quote={quote}
                               history={history}
                               isDeleteDialogOpen={this.state.isDeleteDialogOpen}
                               onOpenDeleteDialog={this.onDialogOpenHandler}
                               onCloseDeleteDialog={this.onDialogCloseHandler}
                               onDelete={this.onDeleteHandler} />
  }
}

const mapStateToProps = (state, props) => ({
  quote: selectors.getQuoteFromHistory(state, props.match.params.id),
  isFetchingHistory: selectors.getIsFetchingQuoteHistory(state),
  wasHistoryFetched: selectors.getWasQuoteHistoryFetched(state)
})

QuoteView = connect(mapStateToProps, { fetch, remove })(QuoteView)

export default QuoteView
