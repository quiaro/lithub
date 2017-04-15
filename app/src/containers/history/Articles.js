import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetch } from '../../actions/article-history';
import CircularProgress from 'material-ui/CircularProgress';
import ArticleHistoryComponent from '../../components/history/Articles'
import * as selectors from '../../reducers'

class ArticleHistory extends Component {

  componentDidMount() {
    const { wasHistoryFetched, fetch } = this.props;

    // If the article history has already been fetched, the history will be kept up
    // to date with each subsequent post, put and delete made. This avoids
    // having to make a new request each time. It's possible to do this because
    // we know that only the user is allowed to modify her own history.
    if (!wasHistoryFetched) {
      fetch();
    }
  }

  render() {
    const { articles, isFetchingArticleHistory, history } = this.props;

    if (isFetchingArticleHistory) {
      return <CircularProgress size={60} thickness={7} />
    }
    return <ArticleHistoryComponent articles={articles} history={history} />
  }
}

const mapStateToProps = (state) => ({
  articles: selectors.getAllArticleHistory(state),
  isFetchingArticleHistory: selectors.getIsFetchingArticleHistory(state),
  wasHistoryFetched: selectors.getWasArticleHistoryFetched(state)
})

ArticleHistory = connect(mapStateToProps, { fetch })(ArticleHistory)

export default ArticleHistory
