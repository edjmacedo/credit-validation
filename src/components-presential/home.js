import React, { Component } from 'react';

import './home.scss';
import Header from '../components/header/header';
import ValidationForm from '../components/validationform/validationform'

class Home extends Component {

  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <Header className="AppBar" />
        <ValidationForm className="AppBar" />
      </div>
    );
  }
}

export default Home;
