'use strict';

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import ProjectDashBoard from './project-dashboard';
import NewProject from './new-project';
import ProjectDetail from './project-detail';

const ProjectLayout = (props) => {
  return (
    <Switch>
      <Route exact path="/project" component={ProjectDashBoard} />
      <Route exact path={`${props.match.url}/new`} component={NewProject} />
      <Route path={`${props.match.url}/:id`} component={ProjectDetail} />
    </Switch>
  );
};

export default ProjectLayout;
