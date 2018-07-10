'use strict';

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import IssueIndex from './issue-index';
import NewIssue from './new-issue';

const IssueLayout = (props) => {
  return (
    <Switch>
      <Route exact path={`${props.match.path}`} component={IssueIndex} />
      <Route path={`${props.match.path}/new`} component={NewIssue} />
    </Switch>
  );
};

export default IssueLayout;
