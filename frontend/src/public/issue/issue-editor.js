'use strict';

import React, { Component } from 'react';
import IssueForm from './issue-form';
import { Redirect } from 'react-router-dom';

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
      },
      success: false
    };
  }

  componentDidMount() {
    (async () => {
      const res = await fetch(
        API_URL +
          `/api/projects/${this.props.match.params.id}/issues/${this.props.match.params.issueId}`,
        {
          method: 'GET',
          credentials: 'include'
        }
      );
      if (res.status === 200) {
        const issue = await res.json();
        Object.keys(issue).forEach((key) => {
          if (issue[`${key}`] === null) {
            issue[`${key}`] = '';
          }
        });
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
    Object.keys(newIssue).forEach((key) => {
      if (key !== 'description') {
        if (newIssue[`${key}`] === '') {
          newIssue[`${key}`] = null;
        }
      }
    });
    const res = await fetch(
      API_URL +
        `/api/projects/${this.props.match.params.id}/issues/${this.props.match.params.issueId}`,
      {
        method: 'PUT',
        body: JSON.stringify({ issue: newIssue }),
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      }
    );
    if (res.status === 200) {
      this.setState({ success: true });
    }
  }

  render() {
    if (this.state.success === true) {
      return <Redirect to={`/project/${this.state.issue.projectId}/issue`} />;
    } else {
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
}

module.exports = IssueEditor;
