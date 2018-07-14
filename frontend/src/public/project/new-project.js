'use strict';

import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import ProjectForm, { handleProjectFormChange } from './project-form';

class NewProject extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      createSuccess: false,
      submitEnable: true,
      submitMessage: '',
      project: {
        id: '',
        name: '',
        description: '',
        isPublic: true
      }
    };
  }

  handleChange(e) {
    const newProject = Object.assign({}, this.state.project);
    handleProjectFormChange(e, newProject);
    this.setState({ project: newProject });
  }

  async handleSubmit(e) {
    e.preventDefault();
    this.setState({ submitEnable: false });
    const project = Object.assign({}, this.state.project);
    let createSuccess = false;
    try {
      const res = await fetch(API_URL + '/api/projects', {
        body: JSON.stringify({ project: project }),
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST',
        credentials: 'include'
      });
      if (res.status === 200) {
        createSuccess = true;
      } else {
        if (res.status === 400) {
          const response = await res.json();
          this.setState({ submitMessage: response.errorMessage });
        } else if (res.status === 409) {
          const response = await res.json();
          this.setState({ submitMessage: response.message });
        } else {
          this.setState({ submitMessage: '新增失敗' });
        }
      }
    } catch (err) {
      console.error(err);
      this.setState({ submitMessage: '新增失敗' });
    }
    if (createSuccess === true) {
      this.setState({ createSuccess: createSuccess });
    } else {
      this.setState({ submitEnable: true });
    }
  }

  render() {
    if (this.state.createSuccess === true) {
      return <Redirect to="/project" />;
    }

    return (
      <ProjectForm
        title="新增專案"
        handleSubmit={this.handleSubmit}
        handleChange={this.handleChange}
        project={this.state.project}
        disableId={false}
        button="送出"
        submitMessage={this.state.submitMessage}
        submitEnable={this.state.submitEnable}
      />
    );
  }
}

export default NewProject;
