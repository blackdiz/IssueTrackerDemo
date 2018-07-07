'use strict';

import React, { Component } from 'react';
import ProjectForm, { handleProjectFormChange } from './project-form';

class ProjectDetail extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      project: {
        id: '',
        name: '',
        description: '',
        isPublic: false
      },
      submitMessage: '',
      submitEnable: true
    };
  }

  handleChange(e) {
    const newProject = Object.assign({}, this.state.project);
    handleProjectFormChange(e, newProject);
    this.setState({ project: newProject });
  }

  async handleSubmit(e) {
    e.preventDefault();
    const editedProject = Object.assign({}, this.state.project);
    const res = await fetch(API_URL + `/api/project/${this.props.match.params.id}`, {
      method: 'PUT',
      body: JSON.stringify({ project: editedProject }),
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    });
    if (res.status === 200) {
      this.setState({ project: await res.json(), submitMessage: '修改成功' });
    } else {
      this.setState({ submitMessage: '修改失敗' });
    }
  }

  componentDidMount() {
    let project;
    (async () => {
      const res = await fetch(API_URL + `/api/project/${this.props.match.params.id}`, {
        method: 'GET',
        credentials: 'include'
      });
      if (res.status === 200) {
        this.setState({ project: await res.json() });
      }
    })();
  }

  render() {
    return (
      <ProjectForm
        title="更改專案資料"
        handleSubmit={this.handleSubmit}
        handleChange={this.handleChange}
        project={this.state.project}
        disableId={true}
        button="修改"
        submitMessage={this.state.submitMessage}
        submitEnable={this.state.submitEnable}
      />
    );
  }
}

export default ProjectDetail;
