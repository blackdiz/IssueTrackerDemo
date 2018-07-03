'use strict';

import React from 'react';
import { Input, FormText } from 'reactstrap';

export default function AccountPasswordInput(props) {
  return (
    <div>
      <Input
        type="password"
        name="password"
        id="password"
        maxLength={20}
        required
        onChange={props.handleChange}
        className="form-control"
      />
      <FormText>最長為20個字</FormText>
    </div>
  );
}
