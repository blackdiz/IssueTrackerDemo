'use strict';

import React from 'react';
import { Form, FormGroup, Label, Input, Row, Col, Button, FormText } from 'reactstrap';

export function handleProjectFormChange(e, project) {
  if (e.target.name === 'isPublic') {
    project['isPublic'] = e.target.checked;
  } else if (e.target.name === 'id') {
    var alphanum = /^[a-z0-9\w]+$/i;
    if (e.target.value.match(alphanum) !== null || e.target.value === '') {
      project['id'] = e.target.value;
    }
  } else {
    project[`${e.target.name}`] = e.target.value;
  }
}

const ProjectForm = (props) => {
  return (
    <div className="mt-5">
      <Row>
        <Col sm={{ offset: 1 }}>
          <h3>{props.title}</h3>
        </Col>
      </Row>
      <Row className="justify-content-sm-center">
        <Col sm={10} className="bg-light">
          <Form className="mt-3 mb-3" onSubmit={props.handleSubmit}>
            <FormGroup row>
              <Col sm={2}>
                <Label from="id">識別代碼</Label>
              </Col>
              <Col sm={10}>
                <Input
                  value={props.project.id}
                  onChange={props.handleChange}
                  type="text"
                  name="id"
                  maxLength="50"
                  required
                  disabled={props.disableId || false}
                />
                <FormText>識別代碼最多50個字，且只可為大小寫英數字組合</FormText>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col sm={2}>
                <Label for="name">名稱</Label>
              </Col>
              <Col sm={10}>
                <Input
                  value={props.project.name}
                  onChange={props.handleChange}
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
                  value={props.project.description}
                  onChange={props.handleChange}
                  type="textarea"
                  name="description"
                  id="description"
                />
              </Col>
            </FormGroup>
            <Button color="primary" type="submit" disabled={!props.submitEnable}>
              {props.button}
            </Button>
          </Form>
          <div>{props.submitMessage}</div>
        </Col>
      </Row>
    </div>
  );
};

export default ProjectForm;
