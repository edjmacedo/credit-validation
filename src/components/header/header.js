import React, { Component } from 'react';

import PropTypes from 'prop-types';
import './header.scss';

class Header extends Component {

  static propTypes = {};

  static defaultProps = {}

  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  componentWillReceiveProps(nextProps) {}

  render() {
    return (
      <div>
      <nav className="navbar navbar-default">
        <div className="container">
          <div className="navbar-header">
            <h1 className="logo">Symbio Sweden</h1>
          </div>
        </div>
      </nav>
      </div>
    );
  }
}

export default Header;
