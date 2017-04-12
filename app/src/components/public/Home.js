import React from 'react';
import PublicAppBar from './AppBar';
import OverviewSummary from '../../containers/OverviewSummary';

const PublicHome = (props) => (
  <div className="public-home">
    <PublicAppBar history={props.history} />
      <main>
        <h1>A place to discover, track and share your taste on <span className="app-font">literature.</span></h1>
        <OverviewSummary history={props.history} />
      </main>
  </div>
);

export default PublicHome;
