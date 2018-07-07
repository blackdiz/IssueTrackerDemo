'use strict';

import React from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';

const ProjectHeader = (props) => {
  return (
    <Nav tabs>
      <NavItem>
        <NavLink>專案資訊</NavLink>
      </NavItem>
      <NavItem>
        <NavLink>問題清單</NavLink>
      </NavItem>
    </Nav>
  );
};

export default ProjectHeader;
