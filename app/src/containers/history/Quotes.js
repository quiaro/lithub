import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetch } from '../../actions/quote-history';
import CircularProgress from 'material-ui/CircularProgress';
import QuotesHistoryComponent from '../../components/history/Quotes'
import * as selectors from '../../reducers'

class QuotesHistory extends Component {

  componentDidMount() {
    const { wasHistoryFetched, fetch } = this.props;

    // If the quote history has already been fetched, the history will be kept up
    // to date with each subsequent post, put and delete made. This avoids
    // having to make a new request each time. It's possible to do this because
    // we know that only the user is allowed to modify her own history.
    if (!wasHistoryFetched) {
      fetch();
    }
  }

  render() {
    const { quotes, isFetchingQuoteHistory, history } = this.props;

    if (isFetchingQuoteHistory) {
      return <CircularProgress size={60} thickness={7} />
    }
    return <QuotesHistoryComponent quotes={quotes} history={history} />
  }
}

const mapStateToProps = (state) => ({
  quotes: selectors.getAllQuoteHistory(state),
  isFetchingQuoteHistory: selectors.getIsFetchingQuoteHistory(state),
  wasHistoryFetched: selectors.getWasQuoteHistoryFetched(state)
})

QuotesHistory = connect(mapStateToProps, { fetch })(QuotesHistory)

export default QuotesHistory
