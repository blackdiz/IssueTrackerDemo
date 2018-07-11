'use strict';

import React, { Component } from 'react';
import { Row, Col, Button } from 'reactstrap';
import ProjectsTable from './projects-table';
import { Link } from 'react-router-dom';

class ProjectIndex extends Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
    this.state = {
      projects: []
    };
  }

  componentDidMount() {
    this.fetchProjects();
  }

  fetchProjects() {
    (async () => {
      const res = await fetch(API_URL + '/api/projects', {
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

  handleDelete(projectId) {
    if (confirm('確定刪除此專案嗎?')) {
      (async () => {
        const res = await fetch(API_URL + `/api/projects/${projectId}`, {
          method: 'DELETE',
          credentials: 'include'
        });
        if (res.status === 204) {
          this.fetchProjects();
        }
      })();
    }
  }

  render() {
    return (
      <div>
        <Row className="justify-content-sm-end mt-3">
          <Col sm={1}>
            <Button color="danger" size="sm" tag={Link} to={`${this.props.match.path}/new`}>
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
            <ProjectsTable projects={this.state.projects} handleDelete={this.handleDelete} />
          </Col>
        </Row>
      </div>
    );
  }
}

export default ProjectIndex;
