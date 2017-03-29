import React from 'react';
import { Card, CardTitle } from 'material-ui/Card';
import PublicAppBar from './PublicAppBar';
import PublicSummary from '../containers/PublicSummary';

const PublicHome = (props) => (
  <div>
    <PublicAppBar />
    <Card className="container">
      <CardTitle title="Literature Hub" subtitle="A place to discover, track and share your taste on literature."/>
      <PublicSummary />
    </Card>
  </div>
);

export default PublicHome;
