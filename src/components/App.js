import React, { Component } from 'react';
import IndexPage from '../pages/Index';
import ScoresIndexPage from '../pages/scores/Index';
import ScoresNewPage from '../pages/scores/New';
import ScoresShowPage from '../pages/scores/Show';
import HelpPage from '../pages/Help';
import NotFoundPage from '../pages/NotFound';
import { Switch, Route } from 'react-router-dom';
import { Routes } from '../constants/';
import ReactGA from 'react-ga';
import Navbar from '../containers/Navbar';

export default class App extends Component {
  componentDidMount() {
    const { pathname } = this.props.location;
    ReactGA.set({ page: pathname });
    ReactGA.pageview(pathname);
  }

  render() {
    return (
      <div>
        <Navbar />
        <Switch>
          <Route exact path={Routes.INDEX} component={IndexPage} />
          <Route exact path={Routes.SCORES.INDEX} component={ScoresIndexPage} />
          <Route exact path={Routes.SCORES.NEW} component={ScoresNewPage} />
          <Route exact path={Routes.SCORES.SHOW} component={ScoresShowPage} />
          <Route exact path={Routes.HELP} component={HelpPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    );
  }
}
