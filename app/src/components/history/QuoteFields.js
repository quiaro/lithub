import React, { PropTypes } from 'react';
import unescape from 'validator/lib/unescape';
import TextField from 'material-ui/TextField';

const QuoteFields = ({
  onChange,
  state
}) => (
  <div className="quote-fields">
    <TextField
      hintText="Quote"
      fullWidth={true}
      multiLine={true}
      rows={3}
      rowsMax={10}
      name="quote"
      errorText={state.errors.quote}
      onChange={onChange}
      value={unescape(state.quote)}
    />

    <TextField
      floatingLabelText="Author"
      fullWidth={true}
      name="author"
      errorText={state.errors.author}
      onChange={onChange}
      value={state.author}
    />

    <TextField
      hintText="Comments or thoughts on the quote"
      fullWidth={true}
      multiLine={true}
      rows={3}
      rowsMax={10}
      onChange={onChange}
      name="comments"
      value={unescape(state.comments)} />
  </div>
);

QuoteFields.propTypes = {
  onChange: PropTypes.func.isRequired,
  state: PropTypes.object.isRequired
};

export default QuoteFields;
