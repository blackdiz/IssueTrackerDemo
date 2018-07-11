'use strict';
import React from 'react';
import { Table, Button } from 'reactstrap';
import { Link } from 'react-router-dom';

const ProjectsTable = (props) => {
  if (props.projects) {
    const projectLinks = props.projects.map((project) => {
      return (
        <tr key={project.id}>
          <td scope="row">
            <Link to={{ pathname: `/project/${project.id}` }}>{project.name}</Link>
          </td>
          <td>{project.description}</td>
          <td>
            <Button
              color="warning"
              onClick={() => {
                props.handleDelete(project.id);
              }}
            >
              X
            </Button>
          </td>
        </tr>
      );
    });
    return (
      <Table responsive striped>
        <thead>
          <tr>
            <th scope="col">名稱</th>
            <th scope="col">簡述</th>
            <th scope="col">刪除</th>
          </tr>
        </thead>
        <tbody>{projectLinks}</tbody>
      </Table>
    );
  }
};

export default ProjectsTable;
