import React from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const AddItem = (props) => {
  let handleChange = (event, index, value) => props.history.push(value);

  return (
    <div>
      <h1>Add a New Item</h1>
      <p>What did you read?</p>
      <SelectField
        floatingLabelText="Category"
        value={null}
        onChange={handleChange}>
            <MenuItem value='/add' primaryText="" />
            <MenuItem value='/add/book' primaryText="A book" />
            <MenuItem value='/add/article' primaryText="An article" />
            <MenuItem value='/add/quote' primaryText="A quote" />
      </SelectField>
    </div>
  )
}

export default AddItem;
