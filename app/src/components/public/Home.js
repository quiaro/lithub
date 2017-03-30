import React from 'react';
import { Card, CardTitle } from 'material-ui/Card';
import PublicAppBar from './AppBar';
import OverviewSummary from '../../containers/OverviewSummary';

const PublicHome = (props) => (
  <div>
    <PublicAppBar />
    <Card className="container">
      <CardTitle title="Literature Hub" subtitle="A place to discover, track and share your taste on literature."/>
      <OverviewSummary />
    </Card>
  </div>
);

export default PublicHome;
