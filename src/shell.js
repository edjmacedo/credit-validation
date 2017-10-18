
// Libs
import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route } from 'react-router-dom';

// presential Components
import Home from './components-presential/home'

// Styles
import './scss/shell.scss';
import 'common-scss';

class Shell extends React.Component
{
  render()
  {
    return (
      <div className="shell-content">
        <HashRouter>
          <Route exact path="/" component={Home} />
          {/*<Route path="/player" component={Video} /> */}
        </HashRouter>
      </div>

    );
  }
}

ReactDOM.render(<Shell />, document.getElementById('shell'));
