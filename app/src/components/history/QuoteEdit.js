import React, { PropTypes } from 'react';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import moment from 'moment';

import QuoteFields from './QuoteFields';

const buttonStyle = {
  marginLeft: 15
}

const EditQuoteForm = ({
  onSubmit,
  onChange,
  history,
  state
}) => {
  let body;
  if (!state._id) {
    body = (<div>Oops! We couldn't find the quote you're looking for</div>);
  } else {
    body = (
      <div>
        <QuoteFields onChange={onChange}
                     state={state}
                     isEditing={true} />
        <span className='record-date'>Entry recorded on: <i>{moment(state.last_modified).format('MMM D, YYYY')}</i></span>
      </div>
    );
  }

  return (
    <div className="my-resource-edit">
      <Paper className="content">
        <h1>Quote Detail</h1>
        <div className="container">
          <form onSubmit={onSubmit}>
            {state.errors.summary && <p className="error-message">{state.errors.summary}</p>}

            {body}

            <div className='actions'>
              <RaisedButton type="submit" label="Done" primary />
              <RaisedButton type="cancel"
                            label="Cancel"
                            style={buttonStyle}
                            onTouchTap={() => { history.push(`/history/quotes/${state._id}`) }} />
            </div>
          </form>
        </div>
      </Paper>
    </div>
  )
};

EditQuoteForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  state: PropTypes.object.isRequired
};

export default EditQuoteForm;
