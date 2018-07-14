'use strict';

import React, { Component } from 'react';
import { Col, Form, FormGroup, Label, Button } from 'reactstrap';
import AccountForm, { handleInputChange } from '../component/account-form';
import { Redirect } from 'react-router-dom';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      account: {
        name: '',
        password: ''
      },
      submitEnable: true,
      submitMessage: '',
      loginSuccess: false
    };
  }

  handleChange(e) {
    this.setState({ account: handleInputChange(e, this.state.account) });
  }

  async handleSubmit(e) {
    this.setState({ submitEnable: false, submitMessage: '' });
    e.preventDefault();
    let loginSuccess = false;
    try {
      const res = await fetch(API_URL + '/api/login', {
        body: JSON.stringify({ account: this.state.account }),
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST',
        credentials: 'include'
      });
      if (res.status === 200) {
        this.props.login(this.state.account.name, true);
        loginSuccess = true;
      } else {
        if (res.status === 400) {
          const response = await res.json();
          const errorMessage = response.errors.map((error) => {
            return <div key={error.messages}>{error.messages}</div>;
          });
          this.setState({ submitMessage: errorMessage });
        } else {
          this.setState({ submitMessage: '登入失敗' });
        }
        this.props.login(false);
      }
    } catch (err) {
      this.setState({ submitMessage: '登入失敗' });
      this.props.login(false);
    }

    if (loginSuccess === true) {
      this.setState({ loginSuccess: true });
    } else {
      this.setState({ submitEnable: true });
    }
  }

  render() {
    if (this.state.loginSuccess === true) {
      return <Redirect to={{ pathname: '/project' }} />;
    }

    return (
      <AccountForm
        title="登入"
        button="登入"
        account={this.state.account}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        submitEnable={this.state.submitEnable}
        submitMessage={this.state.submitMessage}
      />
    );
  }
}

export default LoginForm;
