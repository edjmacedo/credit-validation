import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route } from 'react-router-dom';

// presential Components
import Home from './components-presential/home'

// Styles
import style from './scss/shell.scss';

class Shell extends React.Component
{
  render()
  {
    return (
      <div className="shell-content">
        <HashRouter>
          <Route exact path="/" component={Home} />
        </HashRouter>
      </div>

    );
  }
}

ReactDOM.render(<Shell />, document.getElementById('shell'));
