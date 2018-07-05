'use strict';

import React, { Component } from 'react';
import { Col, Form, FormGroup, Label, Button } from 'reactstrap';
import AccountPasswordInput from '../component/account-password-input';
import AccountNameInput from '../component/account-name-input';
import { Redirect } from 'react-router-dom';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      accountname: '',
      password: '',
      submitEnable: true,
      signUpMessage: '',
      loginSuccess: false
    };
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  async handleSubmit(e) {
    this.setState({ submitEnable: false, signUpMessage: '' });
    e.preventDefault();
    let loginSuccess = false;
    try {
      const res = await fetch(API_URL + '/api/login', {
        body: JSON.stringify({
          accountname: this.state.accountname,
          password: this.state.password
        }),
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST',
        credentials: 'include'
      });
      if (res.status === 200) {
        this.props.login(true);
        loginSuccess = true;
      } else {
        const response = await res.json();
        if (res.status === 400) {
          this.setState({ signUpMessage: response.errorMessage });
        } else {
          this.setState({ signUpMessage: '登入失敗' });
        }
        this.props.login(false);
      }
    } catch (err) {
      console.error(err);
      this.setState({ signUpMessage: '登入失敗' });
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
      return <Redirect to="/" />;
    }

    return (
      <div className="d-flex flex-column align-items-sm-center mt-5 justify-content-sm-center align-content-sm-center">
        <div>
          <h4>登入</h4>
        </div>
        <div className="bg-light p-5">
          <Form onSubmit={this.handleSubmit}>
            <FormGroup row>
              <Label for="accountname" sm={4} className="col-form-label">
                使用者名稱
              </Label>
              <Col sm={8}>
                <AccountNameInput value={this.state.accountname} handleChange={this.handleChange} />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="passoword" sm={4} className="col-form-label">
                使用者密碼
              </Label>
              <Col sm={8}>
                <AccountPasswordInput
                  value={this.state.password}
                  handleChange={this.handleChange}
                />
              </Col>
            </FormGroup>

            <Button type="submit" color="primary" disabled={!this.state.submitEnable}>
              登入
            </Button>
          </Form>
          <div>{this.state.signUpMessage}</div>
        </div>
      </div>
    );
  }
}

export default LoginForm;
