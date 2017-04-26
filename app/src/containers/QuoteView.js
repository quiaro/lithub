import React, { Component } from 'react';
import { connect } from 'react-redux';
import LinearProgress from 'material-ui/LinearProgress';

import { fetchQuote } from '../actions/quotes';
import QuoteViewComponent from '../components/QuoteView'
import * as selectors from '../reducers'

class QuoteView extends Component {

  componentDidMount() {
    const { fetchQuote, match } = this.props;
    fetchQuote(match.params.id);
  }

  /**
   * Add a quote favorited by others into the user's favorite list
   * @param {object} quote - quote to add to favorite list
   */
  addExisting(quote) {
    const { history } = this.props;
    // Save quote information in session storage to be retrieved afterwards
    sessionStorage.setItem('quote', JSON.stringify(quote));
    history.push(`/add/quote?existing=true`);
  }

  render() {
    const { quote, isFetchingQuote, history } = this.props;

    if (isFetchingQuote) {
      // Show progress bar if the quote is being loaded
      return <LinearProgress />
    }
    return <QuoteViewComponent quote={quote}
                               history={history}
                               addExisting={this.addExisting.bind(this)} />
  }
}

const mapStateToProps = (state, props) => ({
  quote: selectors.getQuote(state, props.match.params.id),
  isFetchingQuote: selectors.getIsFetchingQuote(state),
})

QuoteView = connect(mapStateToProps, { fetchQuote })(QuoteView)

export default QuoteView
