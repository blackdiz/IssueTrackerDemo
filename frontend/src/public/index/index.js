'use strict';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Container } from 'reactstrap';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from '../component/header';
import SignUpForm from '../sign-up/sign-up-form';
import LoginForm from '../login/login-form';
import ProjectLayout from '../project/project-layout';
import NoMatch from '../component/no-match';
import 'babel-polyfill';

class App extends Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.state = {
      isLoggedIn: false
    };
  }

  logout() {
    window.localStorage.removeItem('loggedInTime');
    window.localStorage.removeItem('accountName');
    this.setState({ isLoggedIn: false });
  }

  hasLoggedIn() {
    if (window.localStorage['loggedInTime']) {
      return new Date().getTime() - window.localStorage['loggedInTime'] < 1800000;
    } else {
      return false;
    }
  }

  componentDidMount() {
    this.setState({ isLoggedIn: this.hasLoggedIn() });
  }

  login(name, success) {
    if (success === true) {
      this.setState({ isLoggedIn: success });
      window.localStorage['loggedInTime'] = new Date().getTime();
      window.localStorage['accountName'] = name;
    }
  }

  render() {
    return (
      <Router>
        <div className="d-flex flex-column">
          <header>
            <Header isLoggedIn={this.state.isLoggedIn} logout={this.logout} />
          </header>
          <Container fluid>
            <Switch>
              <Route path="/login" render={() => <LoginForm login={this.login} />} />
              <Route path="/sign-up" component={SignUpForm} />
              <Route path="/project" component={ProjectLayout} />
              <Route component={NoMatch} />
            </Switch>
          </Container>
        </div>
      </Router>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
