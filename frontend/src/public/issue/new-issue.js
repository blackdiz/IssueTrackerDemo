'use strict';

import React, { Component } from 'react';
import IssueForm from './issue-form';
import { Redirect } from 'react-router-dom';
import moment from 'moment-timezone';

class NewIssue extends Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInit = this.handleInit.bind(this);
    this.handleChangeStart = this.handleChangeStart.bind(this);
    this.handleChangeEnd = this.handleChangeEnd.bind(this);
    this.state = {
      issue: {
        projectId: `${this.props.match.params.id}`,
        tagId: 0,
        title: '',
        description: '',
        statusId: 0,
        startDate: null,
        endDate: null,
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

  handleChangeStart(startDate) {
    let endDate = this.state.issue.endDate;
    if (startDate !== null && startDate.isAfter(endDate)) {
      endDate = null;
    }
    const newIssue = Object.assign({}, this.state.issue, {
      startDate: startDate,
      endDate: endDate
    });
    this.setState({
      issue: newIssue
    });
  }

  handleChangeEnd(endDate) {
    if (endDate !== null && endDate.isBefore(this.state.issue.startDate)) {
      endDate = this.state.issue.startDate;
    }
    const newIssue = Object.assign({}, this.state.issue, { endDate: endDate });
    this.setState({
      issue: newIssue
    });
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
    newIssue.startDate =
      newIssue.startDate === null ? null : moment(newIssue.startDate).format('YYYY-MM-DD');
    newIssue.endDate =
      newIssue.endDate === null ? null : moment(newIssue.endDate).format('YYYY-MM-DD');
    const res = await fetch(API_URL + `/api/projects/${this.props.match.params.id}/issues`, {
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
            handleChangeStart={this.handleChangeStart}
            handleChangeEnd={this.handleChangeEnd}
            issue={this.state.issue}
            handleInit={this.handleInit}
          />
        </div>
      );
    }
  }
}

export default NewIssue;
