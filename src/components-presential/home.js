import React, { Component } from 'react';
import Header from '../components/header/header';
import ValidationForm from '../components/validationform/validationform'

class Home extends Component {
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
