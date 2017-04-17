import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchReadByOthers, resetQuotes } from '../actions/quotes';
import CircularProgress from 'material-ui/CircularProgress';
import QuotesByOthersComponent from '../components/QuotesByOthers'
import * as selectors from '../reducers'

class QuotesByOthers extends Component {

  constructor(props) {
    super(props);
    this.isScrolling = false;

    // Fetch more data on scroll
    this.monitorScroll = function(e) {
      if (!this.isScrolling) {
        // Scroll optimization with window.requestAnimationFrame
        // per: https://developer.mozilla.org/en-US/docs/Web/Events/scroll
        window.requestAnimationFrame(() => {
          const htmlEl = document.querySelector('html');
          const bodyEl = document.querySelector('body');

          // If the user has scrolled past 80% of the body's scroll height
          // (total height including overflow), then we'll make a request to
          // fetch more quotes
          const threshold = Math.round(bodyEl.scrollHeight * 0.8);
          if (htmlEl.clientHeight + bodyEl.scrollTop > threshold) {
            const { fetchReadByOthers, isFetchingQuotesReadByOthers, quotesNextIndex } = this.props;

            // Make sure a request hasn't already been made before making
            // another request
            if (!isFetchingQuotesReadByOthers) {
              fetchReadByOthers(quotesNextIndex);
            }
          }
          this.isScrolling = false;
        });
      }
      this.isScrolling = true;
    }.bind(this)
  }

  componentDidMount() {
    const { fetchReadByOthers } = this.props;

    // Every time the component is mounted, a request is made to fetch
    // all the quotes read by others
    fetchReadByOthers();
    window.addEventListener('scroll', this.monitorScroll);
  }

  componentWillUnmount() {
    const { resetQuotes } = this.props;

    // Every time the component is unmounted, clear the quote list
    // by other users so that when it is mounted again results won't
    // be stale.
    resetQuotes();
    window.removeEventListener('scroll', this.monitorScroll);
  }

  render() {
    const { quotes, isFetchingQuotesReadByOthers, history } = this.props;

    return (
      <div>
        <QuotesByOthersComponent quotes={quotes} history={history} />
        {isFetchingQuotesReadByOthers && <CircularProgress size={60} thickness={7} />}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  quotes: selectors.getAllQuotesReadByOthers(state),
  isFetchingQuotesReadByOthers: selectors.getIsFetchingQuotesReadByOthers(state),
  quotesNextIndex: selectors.getQuotesNextIndex(state)
})

QuotesByOthers = connect(mapStateToProps, { fetchReadByOthers, resetQuotes })(QuotesByOthers)

export default QuotesByOthers
