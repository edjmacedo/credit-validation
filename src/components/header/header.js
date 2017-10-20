import React, { Component } from 'react';
import classnames from 'classnames';

class Header extends Component {
  render() {
    return (
      <div>
        <nav className={classnames("navbar", "navbar-default")}>
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
