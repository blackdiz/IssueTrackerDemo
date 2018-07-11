'use strict';

import React, { Component } from 'react';
import IssuesTable from './issues-table';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';

class IssueIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      issues: []
    };
  }

  componentDidMount() {
    (async () => {
      const res = await fetch(API_URL + `/api/project/${this.props.match.params.id}/issue`, {
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

  render() {
    return (
      <div className="mt-2">
        <div className="d-flex justify-content-sm-end">
          <Button size="sm" color="danger" tag={Link} to={`${this.props.match.url}/new`}>
            建立新問題
          </Button>
        </div>
        <div className="mt-2">
          <IssuesTable match={this.props.match} issues={this.state.issues} />
        </div>
      </div>
    );
  }
}

export default IssueIndex;
