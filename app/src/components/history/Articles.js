import React from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn}
  from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';
import moment from 'moment';

const ArticlesHistory = (props) => {
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
            <TableHeaderColumn tooltip="Article title">Title</TableHeaderColumn>
            <TableHeaderColumn tooltip="My rating for this article">Rating</TableHeaderColumn>
            <TableHeaderColumn tooltip="Entry recorded date">Recorded</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody
          displayRowCheckbox={false}
          stripedRows={true}>
          {props.articles.map((article, index) => (
            <TableRow key={index} selectable={false}>
              <TableRowColumn>{article.title}</TableRowColumn>
              <TableRowColumn>{article.rating}</TableRowColumn>
              <TableRowColumn>{moment(article.created).format('MMM D, YYYY')}</TableRowColumn>
            </TableRow>
            ))}
        </TableBody>
      </Table>
    );
  } else {
    body = (
      <div>
        <p>Your history list is currently empty</p>
        <RaisedButton label="Add an article" primary={true} />
      </div>
    );
  }
  return (
    <div>
      <h1>My Article History</h1>
      {body}
    </div>
  )
}

export default ArticlesHistory;
