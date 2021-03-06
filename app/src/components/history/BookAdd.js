import React from 'react';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';

import BookFields from './BookFields';

const buttonStyle = {
  marginLeft: 20
}

const AddBookForm = ({
  onSubmit,
  onChange,
  onSliderChange,
  history,
  state
}) => (
  <div className="container">
    <form onSubmit={onSubmit}>
      {state.errors.summary && <p className="error-message">{state.errors.summary}</p>}

        <BookFields onChange={onChange}
                    onSliderChange={onSliderChange}
                    state={state} />

      <div className='actions'>
        <RaisedButton type="submit" label="Done" primary={true} />
        <RaisedButton type="cancel"
                      label="Cancel"
                      style={buttonStyle}
                      onTouchTap={() => { history.push('/history/books') }} />
      </div>
    </form>
  </div>
);

AddBookForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onSliderChange: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  state: PropTypes.object.isRequired
};

export default AddBookForm;
