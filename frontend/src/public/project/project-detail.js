'use strict';

import React from 'react';
import ProjectHeader from './project-header';
import ProjectEditor from './project-editor';
import { Switch, Route } from 'react-router-dom';
import IssueLayout from '../issue/issue-layout';

const ProjectDetail = (props) => {
  return (
    <div>
      <ProjectHeader match={props.match} />
      <Switch>
        <Route exact path={`${props.match.path}`} component={ProjectEditor} />
        <Route path={`${props.match.path}/issue`} component={IssueLayout} />
      </Switch>
    </div>
  );
};

export default ProjectDetail;
