'use strict';

import React from 'react';
import { Route, Redirect } from 'react-router-dom';

function PrivateRoute({ component: Component, authenticated, isLoading, ...rest }) {
  if (!isLoading) {
    return (
      <Route
        {...rest}
        render={(props) =>
          authenticated === true ? (
            <Component {...props} />
          ) : (
            <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
          )
        }
      />
    );
  } else {
    return null;
  }
}

export default PrivateRoute;
