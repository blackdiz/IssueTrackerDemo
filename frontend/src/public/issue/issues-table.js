'use strict';

import React from 'react';
import { Table, Button } from 'reactstrap';
import { Link } from 'react-router-dom';

const IssuesTable = (props) => {
  if (props.issues) {
    const issues = props.issues.map((issue) => {
      const accountName = window.localStorage['accountName'];
      return (
        <tr key={issue.id}>
          <td>
            <Link to={`${props.match.url}/${issue.id}`}>#{issue.id}</Link>
          </td>
          <td>{issue.title}</td>
          <td>{issue.tag.name}</td>
          <td>{issue.status.name}</td>
          <td>{issue.priority.name}</td>
          {accountName === issue.creator ? (
            <td>
              <Button
                color="warning"
                onClick={() => {
                  props.handleDelete(issue.id);
                }}
              >
                X
              </Button>
            </td>
          ) : (
            <td />
          )}
        </tr>
      );
    });
    return (
      <Table responsive striped>
        <thead>
          <tr>
            <th scope="col">編號</th>
            <th scope="col">標題</th>
            <th scope="col">追蹤標籤</th>
            <th scope="col">狀態</th>
            <th scope="col">優先權</th>
            <th scope="col">刪除</th>
          </tr>
        </thead>
        <tbody>{issues}</tbody>
      </Table>
    );
  }
};

export default IssuesTable;
