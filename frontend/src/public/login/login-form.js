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
    try {
      console.log(API_URL);
      const res = await fetch(API_URL + '/api/login', {
        body: JSON.stringify({
          accountname: this.state.accountname,
          password: this.state.password
        }),
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache'
        },
        method: 'POST',
        credentials: 'include'
      });
      if (res.status === 200) {
        this.props.login(true);
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
