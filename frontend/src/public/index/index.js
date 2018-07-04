'use strict';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Header from '../component/header';
import { Container, Row, Col } from 'reactstrap';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import SignUpForm from '../sign-up/sign-up-form';
import LoginForm from '../login/login-form';
import 'babel-polyfill';

class App extends Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.state = {
      isLogIn: false
    };
  }

  login(success) {
    this.setState({ isLogIn: success });
  }

  render() {
    return (
      <Router>
        <div className="d-flex flex-column">
          <header>
            <Header />
          </header>
          <Container fluid>
            <Switch>
              <Route path="/login" render={() => <LoginForm login={this.login} />} />
              <Route path="/sign-up" component={SignUpForm} />
            </Switch>
          </Container>
        </div>
      </Router>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
