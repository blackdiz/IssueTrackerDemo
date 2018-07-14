'use strict';

import React, { Component } from 'react';
import { Form, FormGroup, Label, Col, Button, Input, FormText } from 'reactstrap';

export function handleInputChange(e, account) {
  var alphanum = /^[a-z0-9\w]+$/i;
  if (e.target.value.match(alphanum) !== null || e.target.value === '') {
    const newAccount = Object.assign({}, account, { [e.target.name]: e.target.value });
    return newAccount;
  } else {
    return account;
  }
}

const AccountForm = (props) => {
  return (
    <div className="d-flex flex-column align-items-sm-center mt-5 justify-content-sm-center align-content-sm-center">
      <div>
        <h4>{props.title}</h4>
      </div>
      <div className="bg-light p-5">
        <Form onSubmit={props.handleSubmit}>
          <FormGroup row>
            <Label for="name" sm={4} className="col-form-label">
              使用者名稱
            </Label>
            <Col sm={8}>
              <Input
                type="text"
                name="name"
                id="name"
                maxLength={20}
                required
                value={props.account.name}
                onChange={props.handleChange}
                className="form-control"
              />
              <FormText>最長為20個字只可為英數字組合</FormText>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="passoword" sm={4} className="col-form-label">
              使用者密碼
            </Label>
            <Col sm={8}>
              <Input
                type="password"
                name="password"
                id="password"
                maxLength={20}
                required
                value={props.account.password}
                onChange={props.handleChange}
                className="form-control"
              />
              <FormText>最長為20個字只可為英數字組合</FormText>
            </Col>
          </FormGroup>
          <Button type="submit" color="primary" disabled={!props.submitEnable}>
            送出
          </Button>
        </Form>
        <div>{props.submitMessage}</div>
      </div>
    </div>
  );
};

export default AccountForm;
