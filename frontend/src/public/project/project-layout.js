'use strict';

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import ProjectIndex from './project-index';
import NewProject from './new-project';
import ProjectDetail from './project-detail';

const ProjectLayout = (props) => {
  return (
    <Switch>
      <Route exact path={`${props.match.path}`} component={ProjectIndex} />
      <Route exact path={`${props.match.path}/new`} component={NewProject} />
      <Route path={`${props.match.path}/:id`} component={ProjectDetail} />
    </Switch>
  );
};

export default ProjectLayout;
