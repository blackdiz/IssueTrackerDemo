'use strict';

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import IssueIndex from './issue-index';
import NewIssue from './new-issue';
import IssueEditor from './issue-editor';

const IssueLayout = (props) => {
  return (
    <Switch>
      <Route exact path={`${props.match.path}`} component={IssueIndex} />
      <Route exact path={`${props.match.path}/new`} component={NewIssue} />
      <Route path={`${props.match.path}/:issueId`} component={IssueEditor} />
    </Switch>
  );
};

export default IssueLayout;
