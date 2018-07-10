'use strict';

import React, { Component } from 'react';
import { Row, Col, Form, FormGroup, Input, Button, Label } from 'reactstrap';

async function fetchTags() {
  console.log('test2');
  const res = await fetch(API_URL + '/api/issue-option/tag', {
    method: 'GET',
    credentials: 'include'
  });
  if (res.status === 200) {
    const tags = await res.json();
    return tags.map((tag) => {
      return (
        <option key={tag.id} value={tag.id}>
          {tag.name}
        </option>
      );
    });
  }
}

async function fetchStatus() {
  const res = await fetch(API_URL + '/api/issue-option/status', {
    method: 'GET',
    credentials: 'include'
  });
  if (res.status === 200) {
    const status = await res.json();
    return status.map((status) => {
      return (
        <option key={status.id} value={status.id}>
          {status.name}
        </option>
      );
    });
  }
}

async function fetchPriorities() {
  const res = await fetch(API_URL + '/api/issue-option/priority', {
    method: 'GET',
    credentials: 'include'
  });
  if (res.status === 200) {
    const priorities = await res.json();
    return priorities.map((priority) => {
      return (
        <option key={priority.id} value={priority.id}>
          {priority.name}
        </option>
      );
    });
  }
}

class NewIssue extends Component {
  constructor(props) {
    super(props);
    this.state = {
      issue: {
        title: ''
      },
      tags: [],
      status: [],
      priorities: []
    };
  }

  componentDidMount() {
    (async () => {
      const tags = await fetchTags();
      const status = await fetchStatus();
      const priorities = await fetchPriorities();
      if (Array.isArray(tags)) {
        this.setState({ tags: tags });
      }
      if (Array.isArray(status)) {
        this.setState({ status: status });
      }
      if (Array.isArray(priorities)) {
        this.setState({ priorities: priorities });
      }
    })();
  }

  render() {
    return (
      <div className="mt-3">
        <Row>
          <Col sm={{ size: 1, offset: 1 }}>
            <h2>建立問題</h2>
          </Col>
        </Row>
        <Row>
          <Col sm={{ size: 10, offset: 1 }} className="bg-light">
            <Form className="mt-3">
              <FormGroup row>
                <Col sm="1">
                  <Label for="tagId">追蹤標籤</Label>
                </Col>
                <Col sm="11">
                  <Input type="select" name="tagId" id="tagId" required>
                    {this.state.tags}
                  </Input>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col sm="1">
                  <Label for="title">標題</Label>
                </Col>
                <Col sm="11">
                  <Input
                    type="text"
                    name="title"
                    id="title"
                    maxLength="100"
                    required
                    value={this.state.issue.title}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col sm="1">
                  <Label for="description">簡述</Label>
                </Col>
                <Col sm="11">
                  <Input type="textarea" name="description" id="description" />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col sm="1">
                  <Label for="statusId">狀態</Label>
                </Col>
                <Col sm="5">
                  <Input type="select" name="statusId" id="statusId">
                    {this.state.status}
                  </Input>
                </Col>
                <Col sm="1">
                  <Label for="startDate">開始日期</Label>
                </Col>
                <Col sm="5">
                  <Input type="input" name="startDate" id="startDate" />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col sm="1">
                  <Label for="statusId">優先權</Label>
                </Col>
                <Col sm="5">
                  <Input type="select" name="priorityId" id="priorityId">
                    {this.state.priorities}
                  </Input>
                </Col>
                <Col sm="1">
                  <Label for="endDate">結束日期</Label>
                </Col>
                <Col sm="5">
                  <Input type="input" name="endDate" id="endDate" />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col sm="1">
                  <Label for="assignedAccount">分派給</Label>
                </Col>
                <Col sm="5">
                  <Input type="input" name="assignedAccount" id="assignedAccount" />
                </Col>
                <Col sm="1">
                  <Label for="estimateWorkHour">預估工時</Label>
                </Col>
                <Col sm="5">
                  <Input type="input" name="estimateWorkHour" id="estimateWorkHour" />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col sm="1">
                  <Label for="finishedPercent">完成百分比</Label>
                </Col>
                <Col sm="5">
                  <Input type="input" name="finishedPercent" id="finishedPercent" />
                </Col>
              </FormGroup>
            </Form>
          </Col>
        </Row>
      </div>
    );
  }
}

export default NewIssue;
