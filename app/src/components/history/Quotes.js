import React from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn}
  from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';
import moment from 'moment';

const QuotesHistory = (props) => {
  let body;
  if (!props.quotes) {
    body = (<div></div>);
  } else if (props.quotes.length) {
    body = (
      <Table
        fixedFooter={false}
        selectable={false}>
        <TableHeader
          displaySelectAll={false}
          adjustForCheckbox={false}
          enableSelectAll={false}>
          <TableRow>
            <TableHeaderColumn>Quote</TableHeaderColumn>
            <TableHeaderColumn tooltip="Entry recorded date">Recorded</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody
          displayRowCheckbox={false}
          stripedRows={true}>
          {props.quotes.map((quote, index) => (
            <TableRow key={index} selectable={false}>
              <TableRowColumn>{quote.text}</TableRowColumn>
              <TableRowColumn>{moment(quote.created).format('MMM D, YYYY')}</TableRowColumn>
            </TableRow>
            ))}
        </TableBody>
      </Table>
    );
  } else {
    body = (
      <div>
        <p>Your history list is currently empty</p>
        <RaisedButton label="Add a quote" primary={true} />
      </div>
    );
  }
  return (
    <div>
      <h1>My Quote History</h1>
      {body}
    </div>
  )
}

export default QuotesHistory;
