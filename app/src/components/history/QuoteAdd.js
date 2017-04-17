import React, { PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';

import QuoteFields from './QuoteFields';

const buttonStyle = {
  marginLeft: 20
}

const AddQuoteForm = ({
  onSubmit,
  onChange,
  history,
  state
}) => (
  <div className="container">
    <form onSubmit={onSubmit}>
      {state.errors.summary && <p className="error-message">{state.errors.summary}</p>}

        <QuoteFields onChange={onChange}
                     state={state} />

      <div className='actions'>
        <RaisedButton type="submit" label="Done" primary={true} />
        <RaisedButton type="cancel"
                      label="Cancel"
                      style={buttonStyle}
                      onTouchTap={() => { history.push('/history/quotes') }} />
      </div>
    </form>
  </div>
);

AddQuoteForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  state: PropTypes.object.isRequired
};

export default AddQuoteForm;
