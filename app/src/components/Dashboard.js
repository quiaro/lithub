import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { List, ListItem, makeSelectable } from 'material-ui/List';

const SelectableList = makeSelectable(List);

const Dashboard = ({ location, onMenuChange, onBtnClick }) => (
  <div>
    <div>What have others read lately?</div>
    <SelectableList value={location.pathname} onChange={onMenuChange}>
      <ListItem primaryText="Books" value="/books" />
      <ListItem primaryText="Articles" value="/articles" />
      <ListItem primaryText="Quotes" value="/quotes" />
    </SelectableList>
    <div>
      <RaisedButton label="Share what you have read"
                    primary={true}
                    onTouchTap={() => onBtnClick('/add')} />
    </div>
  </div>
)

export default Dashboard;
