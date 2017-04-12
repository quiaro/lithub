import React from 'react';
import { CardText } from 'material-ui/Card';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';

const OverviewSummary = (props) => (
  <CardText>
    Find out what others are sharing
    <List>
      <Subheader>Books</Subheader>
      {props.books.map((book) =>
        <ListItem key={book._id}
                  primaryText={book.title + ' by ' + book.author} />
      )}
      <Divider />
      <Subheader>Articles</Subheader>
      {props.articles.map((article) =>
        <ListItem key={article.id}
                  primaryText={article.title} />
      )}
      <Divider />
      <Subheader>Quotes</Subheader>
      {props.quotes.map((quote) =>
        <ListItem key={quote.id}
                  primaryText={quote.text} />
      )}
    </List>
  </CardText>
)

export default OverviewSummary;
