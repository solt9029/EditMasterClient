import React, { Component } from 'react';
import Index from './pages/Index';
import ScoresIndex from './pages/scores/Index';
import ScoresNew from './pages/scores/New';
import ScoresShow from './pages/scores/Show';
import Help from './pages/Help';
import NotFound from './pages/NotFound';
import { Switch, Route, Redirect } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import constants from '../constants';
import qs from 'qs';

const ToIndex = () => {
  return <Redirect to={constants.route.index} />;
};

const ToHelp = () => {
  return <Redirect to={constants.route.help} />;
};

const ToScoresIndex = () => {
  return <Redirect to={constants.route.scores.index} />;
};

class ToScoresNewOrScoresShow extends Component {
  render() {
    const query = qs.parse(this.props.location.search, {
      ignoreQueryPrefix: true,
    });
    if (query.id) {
      const to = `/scores/${query.id}`; // show
      return <Redirect to={to} />;
    }
    return <Redirect to={constants.route.scores.new} />;
  }
}
ToScoresNewOrScoresShow = withRouter(ToScoresNewOrScoresShow);

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          {/* redirect for the previous system */}
          <Route exact path="/Scores/index" component={ToIndex} />
          <Route exact path="/Scores/help" component={ToHelp} />
          <Route exact path="/Scores/view" component={ToScoresIndex} />
          <Route
            exact
            path="/Scores/edit"
            component={ToScoresNewOrScoresShow}
          />

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
