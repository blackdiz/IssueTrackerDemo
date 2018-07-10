'use strict';

import React from 'react';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';

const Header = (props) => {
  let navItems;
  if (props.isLoggedIn === true) {
    navItems = [
      <NavItem key="project">
        <NavLink tag={Link} to="/project">
          專案首頁
        </NavLink>
      </NavItem>,
      <NavItem key="logout">
        <NavLink onClick={props.logout}>登出</NavLink>
      </NavItem>
    ];
  } else {
    navItems = [
      <NavItem key="login">
        <NavLink tag={Link} to="/login">
          登入
        </NavLink>
      </NavItem>,
      <NavItem key="signUp">
        <NavLink tag={Link} to="/sign-up">
          註冊
        </NavLink>
      </NavItem>
    ];
  }

  return (
    <Navbar color="info" dark expand="sm">
      <NavbarBrand href="/">
        <h1>Issue Tracker Demo</h1>
      </NavbarBrand>
      <Nav className="ml-auto" navbar>
        {navItems}
      </Nav>
    </Navbar>
  );
};

export default Header;
