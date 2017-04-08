import React, { PropTypes } from 'react';
import { Card } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';

import BookFields from './BookFields';

const AddBookForm = ({
  onSubmit,
  onChange,
  onSliderChange,
  history,
  state
}) => (
  <Card className="container">
    <form onSubmit={onSubmit}>
      {state.errors.summary && <p className="error-message">{state.errors.summary}</p>}

        <BookFields onChange={onChange}
                    onSliderChange={onSliderChange}
                    state={state} />

      <RaisedButton type="submit" label="Done" primary />
      <RaisedButton type="cancel"
                    label="Cancel"
                    onTouchTap={() => { history.push('/history/books') }} />
    </form>
  </Card>
);

AddBookForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onSliderChange: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  state: PropTypes.object.isRequired
};

export default AddBookForm;
