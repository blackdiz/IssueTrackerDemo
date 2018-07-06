'use strict';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Container } from 'reactstrap';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import Header from '../component/header';
import Home from './home';
import SignUpForm from '../sign-up/sign-up-form';
import LoginForm from '../login/login-form';
import ProjectDashBoard from '../project/project-dashboard';
import NewProject from '../project/new-project';
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
    this.setState({ isLoggedIn: false });
    const history = createHistory();
    history.push('/');
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

  login(success) {
    if (success === true) {
      this.setState({ isLoggedIn: success });
      window.localStorage['loggedInTime'] = new Date().getTime();
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
              <Route exact path="/" component={Home} />
              <Route path="/login" render={() => <LoginForm login={this.login} />} />
              <Route path="/sign-up" component={SignUpForm} />
              <Route exact path="/project" component={ProjectDashBoard} />
              <Route path="/project/new" component={NewProject} />
            </Switch>
          </Container>
        </div>
      </Router>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
