'use strict';

import React, { Component } from 'react';
import { Row, Col, Form, FormGroup, FormText, Label, Input, Button } from 'reactstrap';
import AccountPasswordInput from '../component/account-password-input';
import AccountNameInput from '../component/account-name-input';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      accountname: '',
      password: '',
      submitEnable: true,
      signUpMessage: ''
    };
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  async handleSubmit(e) {
    this.setState({ submitEnable: false, signUpMessage: '' });
    e.preventDefault();
    const res = await fetch(API_URL + '/api/login', {
      body: JSON.stringify({ accountname: this.state.accountname, password: this.state.password }),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    });
    if (res.status === 200) {
      this.setState({ signUpMessage: '註冊成功' });
    } else if (res.status === 400) {
      const response = await res.json();
      this.setState({ signUpMessage: response.errorMessage });
    } else {
      const response = await res.json();
      this.setState({ signUpMessage: '註冊失敗' });
    }

    this.setState({ submitEnable: true });
  }

  render() {
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
                <AccountNameInput handleChange={this.handleChange} />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="passoword" sm={4} className="col-form-label">
                使用者密碼
              </Label>
              <Col sm={8}>
                <AccountPasswordInput handleChange={this.handleChange} />
              </Col>
            </FormGroup>

            <Button type="submit" className="bg-primary" disabled={!this.state.submitEnable}>
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
