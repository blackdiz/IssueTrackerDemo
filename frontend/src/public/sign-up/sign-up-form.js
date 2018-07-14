'use strict';

import React, { Component } from 'react';
import AccountForm, { handleInputChange } from '../component/account-form';

class SignUpForm extends Component {
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
      submitMessage: ''
    };
  }

  handleChange(e) {
    this.setState({ account: handleInputChange(e, this.state.account) });
  }

  async handleSubmit(e) {
    this.setState({ submitEnable: false, submitMessage: '' });
    e.preventDefault();
    try {
      const res = await fetch(API_URL + '/api/accounts', {
        body: JSON.stringify({ account: this.state.account }),
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST'
      });
      if (res.status === 200) {
        this.setState({ submitMessage: '註冊成功' });
      } else {
        if (res.status === 400) {
          const response = await res.json();
          const errorMessage = response.errors.map((error) => {
            return <div key={error.messages}>{error.messages}</div>;
          });
          this.setState({ submitMessage: errorMessage });
        } else if (res.status === 409) {
          const response = await res.json();
          this.setState({ submitMessage: response.message });
        } else {
          this.setState({ submitMessage: '註冊失敗' });
        }
      }
    } catch (err) {
      this.setState({ submitMessage: '註冊失敗' });
    }

    this.setState({ submitEnable: true });
  }

  render() {
    return (
      <AccountForm
        title="註冊"
        button="送出"
        account={this.state.account}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        submitEnable={this.state.submitEnable}
        submitMessage={this.state.submitMessage}
      />
    );
  }
}

export default SignUpForm;
