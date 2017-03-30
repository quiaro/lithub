import React from 'react';
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar';
import { Link } from 'react-router-dom';

const PublicAppBar = () => (
  <Toolbar>
    <ToolbarGroup>
      <ToolbarTitle text="Lit Hub" />
    </ToolbarGroup>
    <ToolbarGroup lastChild={true}>
      <Link to={'/login'}>Login</Link>
      <Link to={'/signup'}>Sign Up</Link>
    </ToolbarGroup>
  </Toolbar>
)

export default PublicAppBar;
