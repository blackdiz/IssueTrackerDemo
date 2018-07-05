'use strict';

import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, Row, Col, Button } from 'reactstrap';
import { Redirect } from 'react-router-dom';

class NewProject extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      createSuccess: false,
      submitEnable: true,
      errorMessage: '',
      project: {
        name: '',
        description: '',
        isPublic: true
      }
    };
  }

  handleChange(e) {
    const newProject = Object.assign({}, this.state.project);
    newProject[`${e.target.name}`] = e.target.value;
    this.setState({ project: newProject });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ submitEnable: false });
    const project = Object.assign({}, this.state.project);
    (async () => {
      try {
        const res = await fetch(API_URL + '/api/project', {
          body: JSON.stringify({ project: project }),
          headers: {
            'Content-Type': 'application/json'
          },
          method: 'POST',
          credentials: 'include'
        });
        if (res.status === 200) {
          this.setState({ createSuccess: true });
        } else {
          const response = await res.json();
          if (res.status === 400) {
            this.setState({ signUpMessage: response.errorMessage });
          } else {
            this.setState({ signUpMessage: '新增失敗' });
          }
        }
      } catch (err) {
        console.error(err);
        this.setState({ errorMessage: '新增失敗' });
      }

      this.setState({ submitEnable: true });
    })();
  }

  render() {
    if (this.state.createSuccess === true) {
      return <Redirect to="/project" />;
    }

    return (
      <div className="mt-5">
        <Row>
          <Col sm={{ offset: 1 }}>
            <h3>建立新專案</h3>
          </Col>
        </Row>
        <Row className="justify-content-sm-center">
          <Col sm={10} className="bg-light">
            <Form className="mt-3 mb-3" onSubmit={this.handleSubmit}>
              <FormGroup row>
                <Col sm={2}>
                  <Label for="name">名稱</Label>
                </Col>
                <Col sm={10}>
                  <Input
                    value={this.state.project.name}
                    onChange={this.handleChange}
                    type="text"
                    name="name"
                    id="name"
                    maxLength="50"
                    required
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col sm={2}>
                  <Label for="description">簡述</Label>
                </Col>
                <Col sm={10}>
                  <Input
                    value={this.state.project.description}
                    onChange={this.handleChange}
                    type="textarea"
                    name="description"
                    id="description"
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col sm={2}>
                  <Label for="isPublic">是否公開</Label>
                </Col>
                <Col sm={10}>
                  <FormGroup check>
                    <Input
                      type="checkbox"
                      name="isPublic"
                      id="isPublic"
                      checked={this.state.project.isPublic}
                      onChange={this.handleChange}
                      required
                    />
                  </FormGroup>
                </Col>
              </FormGroup>
              <Button color="primary" type="submit" disabled={!this.state.submitEnable}>
                建立
              </Button>
            </Form>
            <div>{this.state.errorMessage}</div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default NewProject;
