import React, { Component } from 'react';

import PropTypes from 'prop-types';
import classnames from 'classnames';

class Panel extends Component {

  static propTypes = {};

  static defaultProps = {}

  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  componentWillReceiveProps(nextProps) {}

  render() {
    return (
      <div className="panel">
        <div className="panel-body">
          <form>
            <div className="form-group">
              <label>Credit card number:</label>
              <div className="input-group">
                <input type="text" className="form-control" id="card" />
                <div className="input-group-addon" id="type"></div>
              </div>
            </div>
            <div className="form-group">
              <label>Name on card:</label>
              <input type="text" className="form-control" />
            </div>
            <div className="clearfix">
              <div className={classnames("form-group", "form-group-mini")}>
                <label>Expiry date:</label>
                <input type="text" className="form-control" />
              </div>
              <div className={classnames("form-group", "form-group-mini")}>
                <label>CVV:</label>
                <input type="text" className="form-control" />
              </div>
            </div>
            <br/>
            <p>
              <button className={classnames("btn", "btn-primary")}>Submit</button>
            </p>
          </form>
        </div>
      </div>
    );
  }
}

export default Panel;
