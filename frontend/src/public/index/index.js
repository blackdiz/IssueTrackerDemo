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
import PrivateRoute from '../component/private-route';
import 'bootstrap/dist/css/bootstrap.min.css';
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
    (async () => {
      const res = await fetch(API_URL + '/api/logout', {
        method: 'GET',
        credentials: 'include'
      });
      if (res.status === 200) {
        window.localStorage.removeItem('accountName');
        this.setState({ isLoggedIn: false });
      }
    })();
  }

  hasLoggedIn() {
    (async () => {
      const res = await fetch(API_URL + '/api/login', {
        method: 'GET',
        credentials: 'include'
      });
      this.setState({ isLoggedIn: res.status === 200 });
    })();
  }

  componentDidMount() {
    (async () => {
      await this.hasLoggedIn();
    })();
  }

  login(name, success) {
    if (success === true) {
      this.setState({ isLoggedIn: success });
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
              <PrivateRoute
                path="/project"
                component={ProjectLayout}
                authenticated={this.state.isLoggedIn}
              />
              <Route component={NoMatch} />
            </Switch>
          </Container>
        </div>
      </Router>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
