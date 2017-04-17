import React from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn}
  from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router-dom';
import unescape from 'validator/lib/unescape';
import moment from 'moment';

const buttonStyle = {
  marginTop: 10,
  marginLeft: 20
}

const quoteStyle = {
  overflow: 'visible',
  whiteSpace: 'wrap',
  paddingTop: 10,
  paddingBottom: 10
}

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
              <TableHeaderColumn className="col-quote">Quote</TableHeaderColumn>
              <TableHeaderColumn className="col-author" tooltip="Quote Author">Author</TableHeaderColumn>
              <TableHeaderColumn className="col-date" tooltip="Entry recorded date">Recorded</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={false}
            showRowHover={true}
            stripedRows={false}>
            {props.quotes.map((quote, index) => (
              <TableRow key={index} selectable={false}>
                <TableRowColumn className="col-quote" style={quoteStyle}><Link to={`/history/quotes/${quote._id}`}>{unescape(quote.quote)}</Link></TableRowColumn>
                <TableRowColumn className="col-author">{quote.author}</TableRowColumn>
                <TableRowColumn className="col-date">{moment(quote.created).format('MMM D, YYYY')}</TableRowColumn>
              </TableRow>
              ))}
          </TableBody>
        </Table>
    );
  } else {
    body = (
      <div className="empty-list">
        <p>Your list is currently empty</p>
      </div>
    );
  }
  return (
    <Paper className="resource-listing my-quotes">
      <h1>My Favorite Quotes</h1>
      {body}
      <RaisedButton label="Add a quote"
                    style={buttonStyle}
                    primary={true} onTouchTap={() => { props.history.push('/add/quote') }} />
    </Paper>
  )
}

export default QuotesHistory;
