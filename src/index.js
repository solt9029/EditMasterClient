import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import history from './history';
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';
import configureStore from './configureStore';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactGA from 'react-ga';
import { googleAnalytics } from './config';

ReactGA.initialize(googleAnalytics.ID);
history.listen(({ pathname }) => {
  ReactGA.set({ page: pathname });
  ReactGA.pageview(pathname);
});

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
