import React, { Component } from 'react';
import IndexView from './IndexView';
import ScoresIndexView from './ScoresIndexView';
import ScoresNewView from './ScoresNewView';
import ScoresShowView from './ScoresShowView';
import HelpView from './HelpView';
import NotFoundView from './NotFoundView';
import { Switch, Route } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { routes } from '../constants/';

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path={routes.INDEX} component={IndexView} />
          <Route exact path={routes.SCORES.INDEX} component={ScoresIndexView} />
          <Route exact path={routes.SCORES.NEW} component={ScoresNewView} />
          <Route exact path={routes.SCORES.SHOW} component={ScoresShowView} />
          <Route exact path={routes.HELP} component={HelpView} />
          <Route component={NotFoundView} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
