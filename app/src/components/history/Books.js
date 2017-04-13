import React from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn}
  from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router-dom';
import moment from 'moment';

const buttonStyle = {
  marginTop: 10,
  marginLeft: 20
}

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
              <TableHeaderColumn className="col-title" tooltip="Book title">Title</TableHeaderColumn>
              <TableHeaderColumn className="col-author" tooltip="Book Author">Author</TableHeaderColumn>
              <TableHeaderColumn className="col-rating">Rating</TableHeaderColumn>
              <TableHeaderColumn className="col-date" tooltip="Entry recorded date">Recorded</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={false}
            showRowHover={true}
            stripedRows={false}>
            {props.books.map((book, index) => (
              <TableRow key={index} selectable={false}>
                <TableRowColumn className="col-title"><Link to={`/history/books/${book._id}`}>{book.title}</Link></TableRowColumn>
                <TableRowColumn className="col-author">{book.author}</TableRowColumn>
                <TableRowColumn className="col-rating">{book.rating}</TableRowColumn>
                <TableRowColumn className="col-date">{moment(book.created).format('MMM D, YYYY')}</TableRowColumn>
              </TableRow>
              ))}
          </TableBody>
        </Table>
    );
  } else {
    body = (
      <div>
        <p>Your history list is currently empty</p>
      </div>
    );
  }
  return (
    <Paper className="resource-listing my-books">
      <h1>My Book History</h1>
      {body}
      <RaisedButton label="Add a book"
                    style={buttonStyle}
                    primary={true} onTouchTap={() => { props.history.push('/add/book') }} />
    </Paper>
  )
}

export default BooksHistory;
