import React from 'react';
import { connect } from 'react-redux';
import unescape from 'validator/lib/unescape';

import withQuoteForm from './withQuoteForm';
import { add } from '../../actions/quote-history';
import AddQuoteForm from '../../components/history/QuoteAdd';
import { getQueryParam } from '../../common/utils';

class AddQuote extends React.Component {

  constructor(props) {
    super(props);

    const searchUrl = props.history.location.search;
    const isExisting = getQueryParam(searchUrl, 'existing');
    let quote = isExisting ? sessionStorage.getItem('quote') : null;
    if (quote) {
      quote = JSON.parse(quote);
    }

    this.state = {
      errors: {},
      quote: quote ? unescape(quote.quote) : '',
      author: quote ? quote.author : '',
      comments: ''
    }
    // Bind the methods from the HOC to this class so they alter this
    // class' state
    this.processForm = this.props.processForm.bind(this);
    this.updateForm = this.props.updateForm.bind(this);
    this.validateForm = this.props.validateForm.bind(this);
  }

  /**
   * Render the component.
   */
  render() {
    const { history } = this.props;

    return (<AddQuoteForm onSubmit={this.processForm}
                          onChange={this.updateForm}
                          history={history}
                          state={this.state} />);
  }
}

AddQuote = connect(undefined, { add })(AddQuote);
AddQuote = withQuoteForm(AddQuote, 'add');

export default AddQuote;
