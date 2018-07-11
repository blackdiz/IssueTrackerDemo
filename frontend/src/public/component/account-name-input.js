'use strict';

import React from 'react';
import { Input, FormText } from 'reactstrap';

export default function AccountNameInput(props) {
  return (
    <div>
      <Input
        type="text"
        name="accountName"
        id="accountName"
        maxLength={20}
        required
        value={props.accountName}
        onChange={props.handleChange}
        className="form-control"
      />
      <FormText>最長為20個字</FormText>
    </div>
  );
}
