'use strict';

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import IssueIndex from './issue-index';

const IssueLayout = (props) => {
  return (
    <Switch>
      <Route exact path={`${props.match.path}`} component={IssueIndex} />
    </Switch>
  );
};

export default IssueLayout;
