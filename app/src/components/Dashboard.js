import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { List, ListItem, makeSelectable } from 'material-ui/List';
import Paper from 'material-ui/Paper';
import '../styles/components/Dashboard.css';

const SelectableList = makeSelectable(List);

const paperStyles = {
  marginTop: 40,
  marginLeft: 20,
  marginRight: 20,
  marginBottom: 20,
  paddingTop: 20,
  paddingBottom: 20
}

const listItemStyles={
  fontFamily: '"Great Vibes", cursive',
  fontSize: '2.4em',
  lineHeight: 1
}

const listItemChild={
  paddingLeft: 30
}

const Dashboard = ({ location, onMenuChange, onBtnClick }) => (
  <Paper zDepth={1} style={paperStyles} className="dashboard">
    <div className="intro">What have others read lately?</div>
    <SelectableList value={location.pathname} onChange={onMenuChange}>
      <ListItem primaryText="Books"
                value="/books"
                style={listItemStyles}
                innerDivStyle={listItemChild}
                hoverColor='#ceb29e' />
      <ListItem primaryText="Articles"
                value="/articles"
                style={listItemStyles}
                innerDivStyle={listItemChild}
                hoverColor='#ceb29e' />
      <ListItem primaryText="Quotes"
                value="/quotes"
                style={listItemStyles}
                innerDivStyle={listItemChild}
                hoverColor='#ceb29e' />
    </SelectableList>
    <div className="action">
      <RaisedButton label="Share what you have read"
                    primary={true}
                    onTouchTap={() => onBtnClick('/add')} />
    </div>
  </Paper>
)

export default Dashboard;
