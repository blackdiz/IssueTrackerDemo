'use strict';

import React, { Component } from 'react';
import IssuesTable from './issues-table';
import { Button, Input, Row, Col, InputGroup, InputGroupAddon } from 'reactstrap';
import { Link } from 'react-router-dom';
import { fetchPriorities, fetchStatus, fetchTags } from './issue-form';

class IssueIndex extends Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
    this.filterIssues = this.filterIssues.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      issues: [],
      priorities: [],
      status: [],
      tags: [],
      filter: {
        tagId: '',
        statusId: '',
        priorityId: ''
      }
    };
  }

  componentDidMount() {
    this.fetchIssues();
    (async () => {
      this.setState({ priorities: this.prependEmptyOption(await fetchPriorities()) });
      this.setState({ status: this.prependEmptyOption(await fetchStatus()) });
      this.setState({ tags: this.prependEmptyOption(await fetchTags()) });
    })();
  }

  prependEmptyOption(options) {
    return [
      <option key="" value="">
        {''}
      </option>
    ].concat(options);
  }

  fetchIssues(filter) {
    (async () => {
      let url = API_URL + `/api/projects/${this.props.match.params.id}/issues`;
      if (filter) {
        url += '?';
        url += Object.keys(filter)
          .filter((key) => filter[key] !== '')
          .map((key) => `${key}=${filter[key]}`)
          .join('&');
      }
      const res = await fetch(url, {
        method: 'GET',
        credentials: 'include'
      });
      if (res.status === 200) {
        const issues = await res.json();
        if (Array.isArray(issues)) {
          this.setState({ issues: issues });
        }
      }
    })();
  }

  filterIssues(e) {
    this.fetchIssues(this.state.filter);
  }

  handleChange(e) {
    const newFilter = Object.assign({}, this.state.filter, { [e.target.name]: e.target.value });
    this.setState({ filter: newFilter });
  }

  handleDelete(issueId) {
    if (confirm('確定刪除此問題嗎?')) {
      (async () => {
        const res = await fetch(
          API_URL + `/api/projects/${this.props.match.params.id}/issues/${issueId}`,
          {
            method: 'DELETE',
            credentials: 'include'
          }
        );
        if (res.status === 204) {
          this.fetchIssues();
        }
      })();
    }
  }

  render() {
    return (
      <div className="mt-2">
        <div className="d-flex justify-content-sm-end">
          <Button size="sm" color="danger" tag={Link} to={`${this.props.match.url}/new`}>
            建立新問題
          </Button>
        </div>
        <div>
          <Row>
            <Col sm="3">
              <InputGroup>
                <InputGroupAddon addonType="prepend">追蹤標籤</InputGroupAddon>
                <Input
                  type="select"
                  value={this.state.filter.tagId}
                  onChange={this.handleChange}
                  name="tagId"
                >
                  {this.state.tags}
                </Input>
              </InputGroup>
            </Col>
            <Col sm="3">
              <InputGroup>
                <InputGroupAddon addonType="prepend">優先權</InputGroupAddon>
                <Input
                  type="select"
                  value={this.state.filter.priorityId}
                  onChange={this.handleChange}
                  name="priorityId"
                >
                  {this.state.priorities}
                </Input>
              </InputGroup>
            </Col>
            <Col sm="3">
              <InputGroup>
                <InputGroupAddon addonType="prepend">狀態</InputGroupAddon>
                <Input
                  type="select"
                  value={this.state.filter.statusId}
                  onChange={this.handleChange}
                  name="statusId"
                >
                  {this.state.status}
                </Input>
              </InputGroup>
            </Col>
            <Col sm="3">
              <Button color="primary" onClick={this.filterIssues}>
                篩選
              </Button>
            </Col>
          </Row>
        </div>
        <div className="mt-2">
          <IssuesTable
            match={this.props.match}
            issues={this.state.issues}
            handleDelete={this.handleDelete}
          />
        </div>
      </div>
    );
  }
}

export default IssueIndex;
