import React, { PropTypes } from 'react';
import { Card } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import Slider from 'material-ui/Slider';
import RaisedButton from 'material-ui/RaisedButton';

const AddQuoteForm = ({
  onSubmit,
  onChange,
  onSliderChange,
  errors,
  quote
}) => (
  <div className="container">
    <form onSubmit={onSubmit}>
      {errors.summary && <p className="error-message">{errors.summary}</p>}

        <TextField
          floatingLabelText="Title"
          fullWidth={true}
          name="text"
          errorText={errors.text}
          onChange={onChange}
          value={quote.text}
        />

        <TextField
          floatingLabelText="Author"
          fullWidth={true}
          name="author"
          errorText={errors.author}
          onChange={onChange}
          value={quote.author}
        />

        <TextField
          floatingLabelText="Source"
          fullWidth={true}
          name="source"
          errorText={errors.source}
          onChange={onChange}
          value={quote.source}
        />

        <div>
          <p>What rating would you give this quote?</p>
          <Slider
            name="rating"
            min={0}
            max={10}
            step={1.0}
            value={quote.rating}
            onChange={onSliderChange} />
          <span>I don't like it</span>
          <span>I love it</span>
        </div>

        <TextField
          hintText="Comments or thoughts on the quote"
          fullWidth={true}
          multiLine={true}
          rows={3}
          rowsMax={10} />

      <RaisedButton type="submit" label="Done" primary />
      <RaisedButton type="cancel" label="Cancel" />
    </form>
  </div>
);

AddQuoteForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  quote: PropTypes.object.isRequired
};

export default AddQuoteForm;
