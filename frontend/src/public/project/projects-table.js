'use strict';
import React from 'react';
import { Table } from 'reactstrap';
import { Link } from 'react-router-dom';

const ProjectsTable = (props) => {
  if (props.projects) {
    const projectLinks = props.projects.map((project) => {
      return (
        <tr>
          <td scope="row">
            <Link to={{ pathname: `${project.id}` }}>{project.name}</Link>
          </td>
          <td>{project.description}</td>
        </tr>
      );
    });
    return (
      <Table responsive striped>
        <thead>
          <tr>
            <th scope="col">名稱</th>
            <th scope="col">簡述</th>
          </tr>
        </thead>
        <tbody>{projectLinks}</tbody>
      </Table>
    );
  }
};

export default ProjectsTable;