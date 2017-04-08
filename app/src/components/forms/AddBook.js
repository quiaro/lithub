import React, { PropTypes } from 'react';
import { Card } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';

import BookFields from './BookFields';

const AddBookForm = ({
  onSubmit,
  onChange,
  onSliderChange,
  state
}) => (
  <Card className="container">
    <form onSubmit={onSubmit}>
      {state.errors.summary && <p className="error-message">{state.errors.summary}</p>}

        <BookFields onChange={onChange}
                    onSliderChange={onSliderChange}
                    state={state} />

      <RaisedButton type="submit" label="Done" primary />
      <RaisedButton type="cancel" label="Cancel" />
    </form>
  </Card>
);

AddBookForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onSliderChange: PropTypes.func.isRequired,
  state: PropTypes.object.isRequired
};

export default AddBookForm;
