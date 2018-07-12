'use strict';

import React, { Component } from 'react';
import IssueForm from './issue-form';
import { Redirect } from 'react-router-dom';
import moment from 'moment-timezone';

class IssueEditor extends Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeStart = this.handleChangeStart.bind(this);
    this.handleChangeEnd = this.handleChangeEnd.bind(this);
    this.state = {
      issue: {
        projectId: `${this.props.match.params.id}`,
        tagId: '',
        title: '',
        description: '',
        statusId: '',
        startDate: null,
        endDate: null,
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
          if (issue[`${key}`] === null && (key !== 'startDate' && key !== 'endDate')) {
            issue[`${key}`] = '';
          }
        });
        issue.startDate = issue.startDate === null ? null : moment(issue.startDate);
        issue.endDate = issue.endDate === null ? null : moment(issue.endDate);
        this.setState({ issue: issue });
      }
    })();
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
    console.log(JSON.stringify(newIssue));
    this.setState({
      issue: newIssue
    });
  }

  handleChangeEnd(endDate) {
    if (endDate !== null && endDate.isBefore(this.state.issue.startDate)) {
      endDate = this.state.issue.startDate;
    }
    const newIssue = Object.assign({}, this.state.issue, { endDate: endDate });
    console.log(JSON.stringify(newIssue));
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
    console.log(JSON.stringify(newIssue));
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
            handleChangeStart={this.handleChangeStart}
            handleChangeEnd={this.handleChangeEnd}
            issue={this.state.issue}
          />
        </div>
      );
    }
  }
}

module.exports = IssueEditor;
