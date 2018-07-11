'use strict';

import React, { Component } from 'react';
import IssueForm from './issue-form';

class IssueEditor extends Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      issue: {
        projectId: `${this.props.match.params.id}`,
        tagId: '',
        title: '',
        description: '',
        statusId: '',
        startDate: '',
        endDate: '',
        priorityId: '',
        assignedAccount: '',
        estimateWorkHour: 0,
        finishedPercent: 0
      }
    };
  }

  componentDidMount() {
    (async () => {
      const res = await fetch(API_URL + `/api${this.props.match.url}`, {
        method: 'GET',
        credentials: 'include'
      });
      if (res.status === 200) {
        const issue = await res.json();
        this.setState({ issue: issue });
      }
    })();
  }

  handleInputChange(e) {
    const newIssue = Object.assign({}, this.state.issue);
    newIssue[`${e.target.name}`] = e.target.value;
    this.setState({ issue: newIssue });
  }

  async handleSubmit(e) {
    e.preventDefault();
    const newIssue = Object.assign({}, this.state.issue);
    if (newIssue.startDate === '') {
      newIssue.startDate = null;
    }
    if (newIssue.endDate === '') {
      newIssue.endDate = null;
    }
    if (newIssue.assignedAccount === '') {
      newIssue.assignedAccount = null;
    }
    const res = await fetch(API_URL + `/api${this.props.match.url}`, {
      method: 'PUT',
      body: JSON.stringify({ issue: newIssue }),
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    });
  }

  render() {
    return (
      <div className="mt-3">
        <IssueForm
          tilte="修改問題"
          button="修改"
          handleInputChange={this.handleInputChange}
          handleSubmit={this.handleSubmit}
          issue={this.state.issue}
        />
      </div>
    );
  }
}

module.exports = IssueEditor;
