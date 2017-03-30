import React from 'react';
import PrivateAppBar from './PrivateAppBar'

const PrivateHome = (props) => (
  <div>
    <PrivateAppBar user={props.currentUser} />
    <div>Yay! The dashboard is displayed!!</div>
  </div>
)

export default PrivateHome;
