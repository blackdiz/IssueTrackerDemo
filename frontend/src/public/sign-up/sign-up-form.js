'use strict';

import React, { Component } from 'react';
import { Col, Form, FormGroup, Label, Button } from 'reactstrap';
import AccountPasswordInput from '../component/account-password-input';
import AccountNameInput from '../component/account-name-input';

class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      accountName: '',
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
    try {
      const res = await fetch(API_URL + '/api/account', {
        body: JSON.stringify({
          accountName: this.state.accountName,
          password: this.state.password
        }),
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST'
      });
      if (res.status === 200) {
        this.setState({ signUpMessage: '註冊成功' });
      } else {
        const response = await res.text();
        if (res.status === 400) {
          this.setState({ signUpMessage: response });
        } else {
          this.setState({ signUpMessage: '註冊失敗' });
        }
      }
    } catch (err) {
      this.setState({ signUpMessage: '註冊失敗' });
    }

    this.setState({ submitEnable: true });
  }

  render() {
    return (
      <div className="d-flex flex-column align-items-sm-center mt-5 justify-content-sm-center align-content-sm-center">
        <div>
          <h4>註冊</h4>
        </div>
        <div className="bg-light p-5">
          <Form onSubmit={this.handleSubmit}>
            <FormGroup row>
              <Label for="accountName" sm={4} className="col-form-label">
                使用者名稱
              </Label>
              <Col sm={8}>
                <AccountNameInput value={this.state.accountName} handleChange={this.handleChange} />
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
              送出
            </Button>
          </Form>
          <div>{this.state.signUpMessage}</div>
        </div>
      </div>
    );
  }
}

export default SignUpForm;
