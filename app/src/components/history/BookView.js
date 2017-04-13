import React from 'react';
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

const BookView = ({ book, history, isDeleteDialogOpen, onOpenDeleteDialog, onCloseDeleteDialog, onDelete}) => {
  let body;
  if (!book) {
    body = (<div>Oops! We couldn't find the book you're looking for</div>);
  } else {
    body = (
      <div>
        <div className='actions'>
          <RaisedButton label="Edit"
                        primary={true}
                        onTouchTap={() => { history.push(`/history/books/${book._id}/edit`) }} />
          <RaisedButton label="Delete"
                        secondary={true}
                        style={buttonStyle}
                        onTouchTap={onOpenDeleteDialog} />
        </div>
        <main>
          <section className='details'>
            <div className='title'>
              <b>Title</b>
              <span>{book.title}</span>
            </div>
            <div className='author'>
              <b>Author</b>
              <span>{book.author}</span>
            </div>
            <span className='record-date'>Entry recorded on: <i>{moment(book.last_modified).format('MMM D, YYYY')}</i></span>
          </section>

          <section className='comments'>
            <h2>My Review</h2>
            <div className='review'>
              <span className='date'>On {moment(book.last_modified).format('MMM D, YYYY')}</span>
              <span className='rating'>{book.rating}</span>
              {book.comments && <blockquote>{book.comments}</blockquote>}
            </div>
          </section>
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
    <Paper className="my-book-view">
      <h1>Book Detail</h1>
      {body}
      <RaisedButton label="Back to History" primary={true} onTouchTap={() => { history.push('/history/books') }} />
      <Dialog title="Delete Book From History"
          actions={actions}
          modal={false}
          open={isDeleteDialogOpen}
          bodyStyle={dialogBodyStyle}
          actionsContainerStyle={dialogActionsStyle}
          onRequestClose={onCloseDeleteDialog} >
          Are you sure you want to delete your review from your book history?
        </Dialog>
    </Paper>
  )
}

export default BookView;
