import React from 'react';
import unescape from 'validator/lib/unescape';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import Dialog from 'material-ui/Dialog';
import moment from 'moment';

const buttonStyle = {
  marginLeft: 15
}
const dialogBodyStyle = {
  lineHeight: 1.6,
  paddingBottom: 15
}
const dialogActionsStyle = {
  paddingBottom: 20,
  paddingLeft: 20,
  paddingRight: 20
}

const QuoteView = ({ quote, history, isDeleteDialogOpen, onOpenDeleteDialog, onCloseDeleteDialog, onDelete}) => {
  let body;
  if (!quote) {
    body = (<div>Oops! We couldn't find the quote you're looking for</div>);
  } else {
    body = (
      <div>
        <div className='actions'>
          <RaisedButton label="Edit"
                        primary={true}
                        onTouchTap={() => { history.push(`/history/quotes/${quote._id}/edit`) }} />
          <RaisedButton label="Delete"
                        secondary={true}
                        style={buttonStyle}
                        onTouchTap={onOpenDeleteDialog} />
        </div>
        <main>
          <section className='details'>
            <div className='quote'>
              <b>Quote</b>
              <span>{unescape(quote.quote)}</span>
            </div>
            <div className='author'>
              <b>Author</b>
              <span>{quote.author}</span>
            </div>
            <span className='record-date'>Entry recorded on: <i>{moment(quote.last_modified).format('MMM D, YYYY')}</i></span>
          </section>

          {quote.comments &&
            <section className='comments'>
              <h2>My Comment</h2>
              <div className='review'>
                <span className='date'>On {moment(quote.last_modified).format('MMM D, YYYY')}</span>
                <blockquote>{unescape(quote.comments)}</blockquote>
              </div>
            </section>
          }
        </main>
      </div>
    );
  }

  const actions = [
    <RaisedButton
      label="Delete"
      secondary={true}
      keyboardFocused={true}
      onTouchTap={onDelete}
    />,
    <RaisedButton
      label="Cancel"
      style={buttonStyle}
      onTouchTap={onCloseDeleteDialog}
    />
  ];

  return (
    <Paper className="my-resource-view">
      <h1>Quote Detail</h1>
      {body}
      <RaisedButton label="Back to History" primary={true} onTouchTap={() => { history.push('/history/quotes') }} />
      <Dialog title="Delete Quote From Favorites"
          actions={actions}
          modal={false}
          open={isDeleteDialogOpen}
          bodyStyle={dialogBodyStyle}
          actionsContainerStyle={dialogActionsStyle}
          onRequestClose={onCloseDeleteDialog} >
          Are you sure you want to delete the quote from your quote history?
        </Dialog>
    </Paper>
  )
}

export default QuoteView;
