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
        <ListItem
          primaryText="The Lost Army of Cambyses"
          secondaryText="Posted by Ramón Valdés"
        />
        <ListItem
          primaryText="The Lost Army of Cambyses"
          secondaryText="Posted by Ramón Valdés"
        />
        <ListItem
          primaryText="The Lost Army of Cambyses"
          secondaryText="Posted by Ramón Valdés"
        />
        <Divider />
        <Subheader>Quotes</Subheader>
        <ListItem
          primaryText="Don't cry because it's over, smile because it happened."
          secondaryText="Posted by Ramón Valdés"
        />
        <ListItem
          primaryText="You know you're in love when you can't fall asleep because reality is finally better than your dreams."
          secondaryText="Posted by Ramón Valdés"
        />
        <ListItem
          primaryText="I like nonsense, it wakes up the brain cells. Fantasy is a necessary ingredient in living."
          secondaryText="Posted by Ramón Valdés"
        />
      </List>
    </CardText>
  </Card>
);

export default HomePage;
