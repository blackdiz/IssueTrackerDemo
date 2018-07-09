'use strict';

import React, { Component } from 'react';
import { Row, Col, Button } from 'reactstrap';
import { Redirect } from 'react-router-dom';
import ProjectsTable from './projects-table';

class ProjectIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: []
    };
  }

  componentDidMount() {
    (async () => {
      const res = await fetch(API_URL + '/api/project', {
        method: 'GET',
        credentials: 'include'
      });
      if (res.status === 200) {
        const projects = await res.json();
        if (Array.isArray(projects)) {
          this.setState({ projects: projects });
        }
      }
    })();
  }

  render() {
    return (
      <div>
        <Row className="justify-content-sm-end mt-3">
          <Col sm={1}>
            <Button color="danger" size="sm" tag="a" href={`${this.props.match.path}/new`}>
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
          <Col>
            <ProjectsTable projects={this.state.projects} />
          </Col>
        </Row>
      </div>
    );
  }
}

export default ProjectIndex;
