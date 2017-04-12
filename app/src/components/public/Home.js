import React from 'react';
import { Card, CardTitle } from 'material-ui/Card';
import PublicAppBar from './AppBar';
import OverviewSummary from '../../containers/OverviewSummary';

const PublicHome = (props) => (
  <div>
    <PublicAppBar />
      <h1>A place to discover, track and share your taste on literature.</h1>
      <OverviewSummary history={props.history} />
  </div>
);

export default PublicHome;
