import React from 'react';
import { connect } from 'react-redux';

import withQuoteForm from './withQuoteForm';
import { add } from '../../actions/quote-history';
import AddQuoteForm from '../../components/history/QuoteAdd';

class AddQuote extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      errors: {},
      quote: '',
      author: '',
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
