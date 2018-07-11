'use strict';

import React, { Component } from 'react';
import IssueForm from './issue-form';
import { Redirect } from 'react-router-dom';

class NewIssue extends Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInit = this.handleInit.bind(this);
    this.state = {
      issue: {
        projectId: `${this.props.match.params.id}`,
        tagId: 0,
        title: '',
        description: '',
        statusId: 0,
        startDate: '',
        endDate: '',
        priorityId: 0,
        assignedAccount: '',
        estimateWorkHour: 0,
        finishedPercent: 0
      },
      success: false
    };
  }

  handleInit(tags, status, priorites) {
    const initIssue = Object.assign({}, this.state.issue);
    initIssue.tagId = tags[0].key;
    initIssue.statusId = status[0].key;
    initIssue.priorityId = priorites[0].key;
    this.setState({ issue: initIssue });
  }

  handleInputChange(e) {
    const newIssue = Object.assign({}, this.state.issue);
    newIssue[`${e.target.name}`] = e.target.value;
    this.setState({ issue: newIssue });
  }

  async handleSubmit(e) {
    e.preventDefault();
    const newIssue = Object.assign({}, this.state.issue);
    Object.keys(issue).forEach((key) => {
      if (issue[`${key}`] === null) {
        issue[`${key}`] = '';
      }
    });
    const res = await fetch(API_URL + `/api/project/${this.props.match.params.id}/issue`, {
      method: 'POST',
      body: JSON.stringify({ issue: newIssue }),
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    });
    if (res.status === 201) {
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
            title="建立問題"
            button="送出"
            handleInputChange={this.handleInputChange}
            handleSubmit={this.handleSubmit}
            issue={this.state.issue}
            handleInit={this.handleInit}
          />
        </div>
      );
    }
  }
}

export default NewIssue;
