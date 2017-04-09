import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import moment from 'moment';

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
                        onTouchTap={onOpenDeleteDialog} />
        </div>
        <div className='details'>
          <div className='title'>
            <span className='label'>Title</span>
            <span className='value'>{book.title}</span>
          </div>
          <div className='author'>
            <span className='label'>Author</span>
            <span className='value'>{book.author}</span>
          </div>
          <div className='review'>
            <span className='rating'>{book.rating}</span>
            {book.comments && <span className='value'>{book.comments}</span>}
          </div>
          <div className='record-date'>
            <span className='label'>Entry recorded on: <i>{moment(book.last_modified).format('MMM D, YYYY')}</i></span>
          </div>
        </div>
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
      onTouchTap={onCloseDeleteDialog}
    />
  ];

  return (
    <div>
      <h1>Book Detail</h1>
      {body}
      <RaisedButton label="Back to History" primary={true} onTouchTap={() => { history.push('/history/books') }} />
      <Dialog title="Dialog With Actions"
          actions={actions}
          modal={false}
          open={isDeleteDialogOpen}
          onRequestClose={onCloseDeleteDialog} >
          Are you sure you want to delete your review from your book history?
        </Dialog>
    </div>
  )
}

export default BookView;
