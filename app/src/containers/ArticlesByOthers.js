import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchReadByOthers, resetArticles } from '../actions/articles';
import CircularProgress from 'material-ui/CircularProgress';
import ArticlesByOthersComponent from '../components/ArticlesByOthers'
import * as selectors from '../reducers'

class ArticlesByOthers extends Component {

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
          // fetch more articles
          const threshold = Math.round(bodyEl.scrollHeight * 0.8);
          if (htmlEl.clientHeight + bodyEl.scrollTop > threshold) {
            const { fetchReadByOthers, isFetchingArticlesReadByOthers, articlesNextIndex } = this.props;

            // Make sure a request hasn't already been made before making
            // another request
            if (!isFetchingArticlesReadByOthers) {
              fetchReadByOthers(articlesNextIndex);
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
    // all the articles read by others
    fetchReadByOthers();
    window.addEventListener('scroll', this.monitorScroll);
  }

  componentWillUnmount() {
    const { resetArticles } = this.props;

    // Every time the component is unmounted, clear the article list
    // by other users so that when it is mounted again results won't
    // be stale.
    resetArticles();
    window.removeEventListener('scroll', this.monitorScroll);
  }

  render() {
    const { articles, isFetchingArticlesReadByOthers, history } = this.props;

    return (
      <div>
        <ArticlesByOthersComponent articles={articles} history={history} />
        {isFetchingArticlesReadByOthers && <CircularProgress size={60} thickness={7} />}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  articles: selectors.getAllArticlesReadByOthers(state),
  isFetchingArticlesReadByOthers: selectors.getIsFetchingArticlesReadByOthers(state),
  articlesNextIndex: selectors.getArticlesNextIndex(state)
})

ArticlesByOthers = connect(mapStateToProps, { fetchReadByOthers, resetArticles })(ArticlesByOthers)

export default ArticlesByOthers
