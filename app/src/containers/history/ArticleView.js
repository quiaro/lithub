import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetch, remove } from '../../actions/article-history';
import * as apiArticleHistory from '../../api/article-history';
import CircularProgress from 'material-ui/CircularProgress';
import ArticleViewComponent from '../../components/history/ArticleView'
import * as selectors from '../../reducers'

class ArticleView extends Component {

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
    const { article, remove, history } = this.props;
    apiArticleHistory.remove(article).then(() => {
      // Dispatch action to delete article review from history
      remove(article);
      history.push('/history/articles');
    })
  }

  render() {
    const { article, isFetchingHistory, history } = this.props;

    if (isFetchingHistory) {
      // Show loading spinner if the article history is being loaded
      return <CircularProgress size={60} thickness={7} />
    }
    return <ArticleViewComponent article={article}
                                 history={history}
                                 isDeleteDialogOpen={this.state.isDeleteDialogOpen}
                                 onOpenDeleteDialog={this.onDialogOpenHandler}
                                 onCloseDeleteDialog={this.onDialogCloseHandler}
                                 onDelete={this.onDeleteHandler} />
  }
}

const mapStateToProps = (state, props) => ({
  article: selectors.getArticleFromHistory(state, props.match.params.id),
  isFetchingHistory: selectors.getIsFetchingArticleHistory(state),
  wasHistoryFetched: selectors.getWasArticleHistoryFetched(state)
})

ArticleView = connect(mapStateToProps, { fetch, remove })(ArticleView)

export default ArticleView
