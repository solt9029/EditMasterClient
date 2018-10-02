import React, { Component } from 'react';
import Index from './pages/Index';
import ScoresIndex from './pages/scores/Index';
import ScoresNew from './pages/scores/New';
import ScoresShow from './pages/scores/Show';
import Help from './pages/Help';
import NotFound from './pages/NotFound';
import { Switch, Route } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import constants from '../constants';

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path={constants.route.index} component={Index} />
          <Route
            exact
            path={constants.route.scores.index}
            component={ScoresIndex}
          />
          <Route
            exact
            path={constants.route.scores.new}
            component={ScoresNew}
          />
          <Route
            exact
            path={constants.route.scores.show}
            component={ScoresShow}
          />
          <Route exact path={constants.route.help} component={Help} />
          <Route component={NotFound} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
