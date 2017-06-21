import React from 'react';
import { connect } from 'react-redux';
import CircularProgress from 'material-ui/CircularProgress';
import unescape from 'validator/lib/unescape';

import { fetch, edit } from '../../actions/article-history';
import withArticleForm from './withArticleForm';
import EditArticleForm from '../../components/history/ArticleEdit';
import * as selectors from '../../reducers';
import { ratingScale } from '../../common/utils';

class EditArticle extends React.Component {

  constructor(props) {
    super(props);
    // Default state. Should be merged with the article object once it's
    // available.
    const ratingVal = (props && props.article && props.article.rating) || 1;
    const ratingText = ratingScale[ratingVal];

    this.state = Object.assign({
      errors: {},
      title: '',
      author: '',
      link: '',
      rating: ratingVal,
      ratingText: ratingText,
      comments: ''
    }, props.article);

    // Bind the methods from the HOC to this class so they alter this
    // class' state
    this.processForm = this.props.processForm.bind(this);
    this.updateForm = this.props.updateForm.bind(this);
    this.updateRating = this.props.updateRating.bind(this);
    this.validateForm = this.props.validateForm.bind(this);
  }

  componentDidMount() {
    const { wasHistoryFetched, fetch } = this.props;

    // If the article history hasn't been loaded into the store, a request
    // is made to load it. The article history should include the article that is
    // going to be edited.
    if (!wasHistoryFetched) {
      fetch();
    }
  }

  componentWillReceiveProps(nextProps) {
    // The article will be loaded async so as soon as it's available it'll be
    // used to update the state.
    if (nextProps.article &&
        (!this.props.article || this.props.article._id !== nextProps.article._id)) {
          // The article title and the comments will be unescaped before passing them
          // to the presentational component.
          const article = Object.assign({}, nextProps.article, {
            title: unescape(nextProps.article.title),
            comments: unescape(nextProps.article.comments),
            ratingText: ratingScale[nextProps.article.rating]
          });
          this.setState(article);
        }
  }

  /**
   * Render the component.
   */
  render() {
    const { wasHistoryFetched, isFetchingArticleHistory, history } = this.props;

    if (!wasHistoryFetched && !isFetchingArticleHistory) {
      // Do not render anything if the article history has not been fetched
      // and we're not in the process of loading it.
      return null;
    }

    if (isFetchingArticleHistory) {
      // Show loading spinner if the article history is being loaded
      return <CircularProgress size={60} thickness={7} />
    }

    return (<EditArticleForm onSubmit={this.processForm}
                             onChange={this.updateForm}
                             onSliderChange={this.updateRating}
                             history={history}
                             state={this.state} />);
  }
}

const mapStateToProps = (state, props) => ({
  article: selectors.getArticleFromHistory(state, props.match.params.id),
  isFetchingArticleHistory: selectors.getIsFetchingArticleHistory(state),
  wasHistoryFetched: selectors.getWasArticleHistoryFetched(state)
})

// Connect component to redux store and add props to it
EditArticle = connect(mapStateToProps, { edit, fetch })(EditArticle);

// Extend component with functions from an HOC
EditArticle = withArticleForm(EditArticle, 'edit');

export default EditArticle;
