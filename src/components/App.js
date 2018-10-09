import React, { Component } from 'react';
import Index from './pages/Index';
import ScoresIndex from './pages/scores/Index';
import ScoresNew from './pages/scores/New';
import ScoresShow from './pages/scores/Show';
import Help from './pages/Help';
import NotFound from './pages/NotFound';
import { Switch, Route } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { routes } from '../constants/';

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path={routes.INDEX} component={Index} />
          <Route exact path={routes.SCORES.INDEX} component={ScoresIndex} />
          <Route exact path={routes.SCORES.NEW} component={ScoresNew} />
          <Route exact path={routes.SCORES.SHOW} component={ScoresShow} />
          <Route exact path={routes.HELP} component={Help} />
          <Route component={NotFound} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
