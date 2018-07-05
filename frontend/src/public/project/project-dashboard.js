'use strict';

import React, { Component } from 'react';
import { Row, Col, Button } from 'reactstrap';
import { Redirect } from 'react-router-dom';

class ProjectDashboard extends Component {
  constructor(props) {
    super(props);
    this.handClick = this.handClick.bind(this);
    this.state = {
      redirect: false,
      projects: []
    };
  }

  handClick() {
    this.setState({ redirect: true });
  }

  render() {
    if (this.state.redirect === true) {
      return <Redirect push to={{ pathname: '/project/new' }} />;
    }

    return (
      <div>
        <Row className="justify-content-sm-end">
          <Col sm={1}>
            <Button color="danger" style={{ fontSize: '14px' }} onClick={this.handClick}>
              建立新專案
            </Button>
          </Col>
        </Row>
        <Row>
          <Col sm={2}>
            <h3>專案清單</h3>
          </Col>
        </Row>
        <Row>
          <Col>{this.state.projects}</Col>
        </Row>
      </div>
    );
  }
}

export default ProjectDashboard;
