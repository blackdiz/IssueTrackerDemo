'use strict';

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import ProjectIndex from './project-index';
import NewProject from './new-project';
import ProjectDetail from './project-detail';

const ProjectLayout = (props) => {
  return (
    <Switch>
      <Route exact path="/project" component={ProjectIndex} />
      <Route exact path={`${props.match.url}/new`} component={NewProject} />
      <Route path={`${props.match.url}/:id`} component={ProjectDetail} />
    </Switch>
  );
};

export default ProjectLayout;
