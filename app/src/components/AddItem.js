import React from 'react';
import { Route, Switch } from 'react-router-dom';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import AddBook from '../containers/forms/AddBook';

const AddItem = (props) => {
  let handleChange = (event, index, value) => props.history.push(value);
  const path = props.location.pathname;
  const selectValue = (path === '/add') ? null : path;

  return (
    <div>
      <h1>Add a New Item</h1>
      <p>What did you read?</p>
      <SelectField
        floatingLabelText="Category"
        value={selectValue}
        onChange={handleChange}>
            <MenuItem value='/add' primaryText="" />
            <MenuItem value='/add/book' primaryText="Book" />
            <MenuItem value='/add/article' primaryText="Article" />
            <MenuItem value='/add/quote' primaryText="Quote" />
      </SelectField>

      {/* Because the parent route /add is declared as a private route, its
          child routes should not be declared as private routes and instead
          use the normal Route component. If the user is not authenticated,
          the parent route will restrict access.
        */}
      <Switch>
        <Route path='/add/book' component={AddBook} />
      </Switch>
    </div>
  )
}

export default AddItem;
