import React, { PropTypes } from 'react';
import AppBar from '../containers/AppBar'

const Base = ({ children }) => (
  <div>
    <AppBar></AppBar>
    {children}
  </div>
);

Base.propTypes = {
  children: PropTypes.array.isRequired
};

export default Base;
