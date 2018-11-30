import React, { Component } from 'react';
import IndexView from './IndexView';
import ScoresIndexView from '../containers/ScoresIndexView';
import ScoresNewView from '../containers/ScoresNewView';
import ScoresShowView from '../containers/ScoresShowView';
import HelpView from './HelpView';
import NotFoundView from './NotFoundView';
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
          <Route exact path={Routes.INDEX} component={IndexView} />
          <Route exact path={Routes.SCORES.INDEX} component={ScoresIndexView} />
          <Route exact path={Routes.SCORES.NEW} component={ScoresNewView} />
          <Route exact path={Routes.SCORES.SHOW} component={ScoresShowView} />
          <Route exact path={Routes.HELP} component={HelpView} />
          <Route component={NotFoundView} />
        </Switch>
      </div>
    );
  }
}
