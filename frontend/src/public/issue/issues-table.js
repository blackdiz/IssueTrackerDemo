'use strict';

import React from 'react';
import { Table } from 'reactstrap';
import { Link } from 'react-router-dom';

const IssuesTable = (props) => {
  if (props.issues) {
    const issues = props.issues.map((issue) => {
      return (
        <tr key={issue.id}>
          <td>
            <Link to={`${props.match.url}/${issue.id}`}>#{issue.id}</Link>
          </td>
          <td>{issue.title}</td>
        </tr>
      );
    });
    return (
      <Table responsive striped>
        <thead>
          <tr>
            <th scope="col">編號</th>
            <th scope="col">標題</th>
          </tr>
        </thead>
        <tbody>{issues}</tbody>
      </Table>
    );
  }
};

export default IssuesTable;
