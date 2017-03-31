import React from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn}
  from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';
import moment from 'moment';

const BooksHistory = (props) => {
  let body;
  if (!props.books) {
    body = (<div></div>);
  } else if (props.books.length) {
    body = (
      <Table
        fixedFooter={false}
        selectable={false}>
        <TableHeader
          displaySelectAll={false}
          adjustForCheckbox={false}
          enableSelectAll={false}>
          <TableRow>
            <TableHeaderColumn tooltip="Book title">Title</TableHeaderColumn>
            <TableHeaderColumn tooltip="My rating for this book">Rating</TableHeaderColumn>
            <TableHeaderColumn tooltip="Entry recorded date">Recorded</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody
          displayRowCheckbox={false}
          stripedRows={true}>
          {props.books.map((book, index) => (
            <TableRow key={index} selectable={false}>
              <TableRowColumn>{book.title}</TableRowColumn>
              <TableRowColumn>{book.rating}</TableRowColumn>
              <TableRowColumn>{moment(book.created).format('MMM D, YYYY')}</TableRowColumn>
            </TableRow>
            ))}
        </TableBody>
      </Table>
    );
  } else {
    body = (
      <div>
        <p>Your history list is currently empty</p>
        <RaisedButton label="Add a book" primary={true} />
      </div>
    );
  }
  return (
    <div>
      <h1>My Book History</h1>
      {body}
    </div>
  )
}

export default BooksHistory;