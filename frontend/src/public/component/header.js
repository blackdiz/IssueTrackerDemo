'use strict';

import React from 'react';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <Navbar color="info" dark expand="sm">
      <NavbarBrand href="/">
        <h1>Issue Tracker</h1>
      </NavbarBrand>
      <Nav className="ml-auto" navbar>
        <NavItem>
          <NavLink tag={Link} to="login">
            登入
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={Link} to="sign-up">
            註冊
          </NavLink>
        </NavItem>
      </Nav>
    </Navbar>
  );
};

export default Header;
