import React, { Component } from 'react';
import Index from './pages/Index';
import ScoresIndex from './pages/scores/Index';
import ScoresNew from './pages/scores/New';
import ScoresShow from './pages/scores/Show';
import NotFound from './pages/NotFound';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={Index} />
          <Route exact path="/scores" component={ScoresIndex} />
          <Route exact path="/scores/new" component={ScoresNew} />
          <Route exact path="/scores/:id" component={ScoresShow} />
          <Route component={NotFound} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({});
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
