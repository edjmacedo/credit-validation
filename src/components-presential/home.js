import React, { Component } from 'react';

import './home.scss';
import Header from '../components/header/header';

class Home extends Component {

  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <Header className="AppBar" />
      </div>
    );
  }
}

export default Home;