'use strict';

import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';

const IssuesTable = (props) => {
  if (props.issues) {
    const issues = props.issues.map((issue) => {
      return (
        <ListGroupItem tag="a" href={`${props.match.url}`}>
          #{issue.id} {issue.name}
        </ListGroupItem>
      );
    });
    return <ListGroup flush>{issues}</ListGroup>;
  }
};

export default IssuesTable;
