import React from 'react';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';

const HomePage = (props) => (
  <Card className="container">
    <CardTitle title="Literature Hub" subtitle="A place to discover, track and share your taste on literature."/>
    <CardText>
      Find out what others are sharing
      <List>
        <Subheader>Books</Subheader>
        {props.books.map((book) =>
          <ListItem key={book.id}
                    primaryText={book.title} />
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
  </Card>
);

export default HomePage;
