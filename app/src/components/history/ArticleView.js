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

const ArticleView = ({ article, history, isDeleteDialogOpen, onOpenDeleteDialog, onCloseDeleteDialog, onDelete}) => {
  let body;
  if (!article) {
    body = (<div>Oops! We couldn't find the article you're looking for</div>);
  } else {
    body = (
      <div>
        <div className='actions'>
          <RaisedButton label="Edit"
                        primary={true}
                        onTouchTap={() => { history.push(`/history/articles/${article._id}/edit`) }} />
          <RaisedButton label="Delete"
                        secondary={true}
                        style={buttonStyle}
                        onTouchTap={onOpenDeleteDialog} />
        </div>
        <main>
          <section className='details'>
            <div className='title'>
              <b>Title</b>
              <span>{unescape(article.title)}</span>
            </div>
            <div className='author'>
              <b>Author</b>
              <span>{article.author}</span>
            </div>
            <div className='link'>
              <b>Link/URL</b>
              <span>{article.link}</span>
            </div>
            <span className='record-date'>Entry recorded on: <i>{moment(article.last_modified).format('MMM D, YYYY')}</i></span>
          </section>

          <section className='comments'>
            <h2>My Review</h2>
            <div className='review'>
              <span className='date'>On {moment(article.last_modified).format('MMM D, YYYY')}</span>
              <span className='rating'>{article.rating}</span>
              {article.comments && <blockquote>{unescape(article.comments)}</blockquote>}
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
    <Paper className="my-resource-view">
      <h1>Article Detail</h1>
      {body}
      <RaisedButton label="Back to History" primary={true} onTouchTap={() => { history.push('/history/articles') }} />
      <Dialog title="Delete Article From History"
          actions={actions}
          modal={false}
          open={isDeleteDialogOpen}
          bodyStyle={dialogBodyStyle}
          actionsContainerStyle={dialogActionsStyle}
          onRequestClose={onCloseDeleteDialog} >
          Are you sure you want to delete your review from your article history?
        </Dialog>
    </Paper>
  )
}

export default ArticleView;
