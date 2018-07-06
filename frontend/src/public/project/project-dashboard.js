'use strict';

import React, { Component } from 'react';
import { Row, Col, Button, ListGroup, ListGroupItem } from 'reactstrap';
import { Redirect, Link } from 'react-router-dom';

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
    if (this.state.redirect === true) {
      return <Redirect push to={{ pathname: '/project/new' }} />;
    }

    const projectList = this.state.projects.map((project) => {
      return (
        <ListGroupItem key={project.id}>
          <Link to={{ pathname: `/project/${project.id}` }}>
            <h4>{project.name}</h4>
          </Link>
        </ListGroupItem>
      );
    });

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
          <Col>
            <ListGroup flush>{projectList}</ListGroup>
          </Col>
        </Row>
      </div>
    );
  }
}

export default ProjectDashboard;
