import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchQuotesHistory } from '../../actions/quotes';
import CircularProgress from 'material-ui/CircularProgress';
import QuotesHistoryComponent from '../../components/history/Quotes'
import * as selectors from '../../reducers'

class QuotesHistory extends Component {

  componentDidMount() {
    const { fetchQuotesHistory } = this.props;
    fetchQuotesHistory();
  }

  render() {
    const { quotes, isFetchingQuotesHistory } = this.props;

    if (isFetchingQuotesHistory) {
      return <CircularProgress size={60} thickness={7} />
    }
    return <QuotesHistoryComponent quotes={quotes} />
  }
}

const mapStateToProps = (state) => ({
  quotes: selectors.getAllQuotesHistory(state),
  isFetchingQuotesHistory: selectors.getIsFetchingQuotesHistory(state)
})

QuotesHistory = connect(
  mapStateToProps,
  { fetchQuotesHistory }
)(QuotesHistory)

export default QuotesHistory
