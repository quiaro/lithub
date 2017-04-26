import React from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn}
  from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router-dom';
import moment from 'moment';
import unescape from 'validator/lib/unescape';

const buttonStyle = {
  marginTop: 10,
  marginLeft: 20
}

const ArticleHistory = (props) => {
  let body;
  if (!props.articles) {
    body = (<div></div>);
  } else if (props.articles.length) {
    body = (
        <Table
          fixedFooter={false}
          selectable={false}>
          <TableHeader
            displaySelectAll={false}
            adjustForCheckbox={false}
            enableSelectAll={false}>
            <TableRow>
              <TableHeaderColumn className="col-title" tooltip="Article title">Title</TableHeaderColumn>
              <TableHeaderColumn className="col-author" tooltip="Article Author">Author</TableHeaderColumn>
              <TableHeaderColumn className="col-rating">Rating</TableHeaderColumn>
              <TableHeaderColumn className="col-date" tooltip="Entry recorded date">Recorded</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={false}
            showRowHover={true}
            stripedRows={false}>
            {props.articles.map((article, index) => (
              <TableRow key={index} selectable={false}>
                <TableRowColumn className="col-title"><Link to={`/history/articles/${article._id}`}>{unescape(article.title)}</Link></TableRowColumn>
                <TableRowColumn className="col-author">{article.author}</TableRowColumn>
                <TableRowColumn className="col-rating">{article.rating}</TableRowColumn>
                <TableRowColumn className="col-date">{moment(article.created).format('MMM D, YYYY')}</TableRowColumn>
              </TableRow>
              ))}
          </TableBody>
        </Table>
    );
  } else {
    body = (
      <div className="empty-list">
        <p>Your history list is currently empty</p>
      </div>
    );
  }
  return (
    <Paper className="resource-listing my-articles">
      <h1>My Article History</h1>
      {body}
      <RaisedButton label="Add an article"
                    style={buttonStyle}
                    primary={true} onTouchTap={() => { props.history.push('/add/article') }} />
    </Paper>
  )
}

export default ArticleHistory;
