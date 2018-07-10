'use strict';

import React from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';

const ProjectHeader = (props) => {
  return (
    <Nav tabs>
      <NavItem>
        <NavLink tag={Link} to={`${props.match.url}`}>
          專案資訊
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink tag={Link} to={`${props.match.url}/issue`}>
          問題清單
        </NavLink>
      </NavItem>
    </Nav>
  );
};

export default ProjectHeader;
