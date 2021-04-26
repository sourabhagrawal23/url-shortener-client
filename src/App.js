import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Homepage from './Homepage';
import Redirect from './Redirect';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/url-shortener-client" component={Homepage} />
          <Route exact path="/url-shortener-client/:urlCode" component={Redirect} />
        </Switch>
      </Router>
    );
  }
}

export default App;
