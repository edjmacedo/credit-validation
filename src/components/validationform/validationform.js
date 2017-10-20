import React, { Component } from 'react';
import Panel from '../panel/panel';
import classnames from 'classnames';

class ValidationForm extends Component {

  render() {
    return (
      <div className="container">
        <div className={classnames("col-xs-12", "col-sm-6", "col-sm-offset-3")}>
          <div className="page-header">
            <h1>Order now</h1>
          </div>
          <Panel />
        </div>
      </div>
    );
  }
}

export default ValidationForm;
