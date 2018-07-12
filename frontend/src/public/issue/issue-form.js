'use strict';

import React, { Component } from 'react';
import { Row, Col, Form, FormGroup, Input, Button, Label } from 'reactstrap';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

async function fetchTags() {
  const res = await fetch(API_URL + '/api/issue-options/tags', {
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
  const res = await fetch(API_URL + '/api/issue-options/status', {
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
  const res = await fetch(API_URL + '/api/issue-options/priorities', {
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

async function fetchAssignableAccounts(projectId) {
  const res = await fetch(API_URL + `/api/projects/${projectId}/accounts`, {
    method: 'GET',
    credentials: 'include'
  });
  if (res.status === 200) {
    const accounts = await res.json();
    return [<option key="" value="" />].concat(
      accounts.map((account) => {
        return (
          <option key={account.name} value={account.name}>
            {account.name}
          </option>
        );
      })
    );
  }
}

function getFinishedPercent() {
  return Array.from(Array(11).keys(), (i) => i * 10).map((num) => {
    return (
      <option key={num} value={num}>
        {num}%
      </option>
    );
  });
}

class IssueForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: [],
      status: [],
      priorities: [],
      assignedAccounts: [],
      finishedPercent: getFinishedPercent()
    };
  }

  componentDidMount() {
    (async () => {
      const tags = await fetchTags();
      const status = await fetchStatus();
      const priorities = await fetchPriorities();
      const accounts = await fetchAssignableAccounts(this.props.issue.projectId);
      if (Array.isArray(tags)) {
        this.setState({ tags: tags });
      }
      if (Array.isArray(status)) {
        this.setState({ status: status });
      }
      if (Array.isArray(accounts)) {
        this.setState({ assignedAccounts: accounts });
      }
      if (Array.isArray(priorities)) {
        this.setState({ priorities: priorities });
      }
      if (this.props.handleInit) {
        this.props.handleInit(tags, status, priorities);
      }
    })();
  }

  render() {
    return (
      <div>
        <Row>
          <Col sm={{ size: 1, offset: 1 }}>
            <h2>{this.props.title}</h2>
          </Col>
        </Row>
        <Row>
          <Col sm={{ size: 10, offset: 1 }} className="bg-light">
            <Form className="mt-3 mb-3" onSubmit={this.props.handleSubmit}>
              <FormGroup row>
                <Col sm="1">
                  <Label for="tagId">追蹤標籤</Label>
                </Col>
                <Col sm="11">
                  <Input
                    type="select"
                    name="tagId"
                    id="tagId"
                    required
                    value={this.props.issue.tagId}
                    onChange={this.props.handleInputChange}
                  >
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
                    value={this.props.issue.title}
                    onChange={this.props.handleInputChange}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col sm="1">
                  <Label for="description">簡述</Label>
                </Col>
                <Col sm="11">
                  <Input
                    type="textarea"
                    name="description"
                    id="description"
                    value={this.props.issue.description}
                    onChange={this.props.handleInputChange}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col sm="1">
                  <Label for="statusId">狀態</Label>
                </Col>
                <Col sm="5">
                  <Input
                    type="select"
                    name="statusId"
                    id="statusId"
                    value={this.props.issue.statusId}
                    onChange={this.props.handleInputChange}
                  >
                    {this.state.status}
                  </Input>
                </Col>
                <Col sm="1">
                  <Label for="startDate">開始日期</Label>
                </Col>
                <Col sm="5">
                  <DatePicker
                    locale="zh-tw"
                    dateFormat="YYYY-MM-DD"
                    selected={this.props.issue.startDate}
                    onChange={this.props.handleChangeStart}
                    isClearable={true}
                    selectsStart
                    startDate={this.props.issue.startDate}
                    endDate={this.props.issue.endDate}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col sm="1">
                  <Label for="statusId">優先權</Label>
                </Col>
                <Col sm="5">
                  <Input
                    type="select"
                    name="priorityId"
                    id="priorityId"
                    value={this.props.issue.priorityId}
                    onChange={this.props.handleInputChange}
                  >
                    {this.state.priorities}
                  </Input>
                </Col>
                <Col sm="1">
                  <Label for="endDate">結束日期</Label>
                </Col>
                <Col sm="5">
                  <DatePicker
                    locale="zh-tw"
                    dateFormat="YYYY-MM-DD"
                    selected={this.props.issue.endDate}
                    onChange={this.props.handleChangeEnd}
                    isClearable={true}
                    selectsEnd
                    startDate={this.props.issue.startDate}
                    endDate={this.props.issue.endDate}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col sm="1">
                  <Label for="assignedAccount">分派給</Label>
                </Col>
                <Col sm="5">
                  <Input
                    type="select"
                    name="assignedAccount"
                    id="assignedAccount"
                    value={this.props.issue.assignedAccount}
                    onChange={this.props.handleInputChange}
                  >
                    ${this.state.assignedAccounts}
                  </Input>
                </Col>
                <Col sm="1">
                  <Label for="estimateWorkHour">預估工時</Label>
                </Col>
                <Col sm="5">
                  <Input
                    type="input"
                    name="estimateWorkHour"
                    id="estimateWorkHour"
                    value={this.props.issue.estimateWorkHour}
                    onChange={this.props.handleInputChange}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col sm="1">
                  <Label for="finishedPercent">完成百分比</Label>
                </Col>
                <Col sm="5">
                  <Input
                    type="select"
                    name="finishedPercent"
                    id="finishedPercent"
                    value={this.props.issue.finishedPercent}
                    onChange={this.props.handleInputChange}
                  >
                    {this.state.finishedPercent}
                  </Input>
                </Col>
              </FormGroup>
              <Button type="submit" color="primary">
                {this.props.button}
              </Button>
            </Form>
          </Col>
        </Row>
      </div>
    );
  }
}

export default IssueForm;
