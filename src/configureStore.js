import { createStore, combineReducers, applyMiddleware } from 'redux';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import * as reducers from './reducers';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import history from './history';

export default function configureStore() {
  return createStore(
    combineReducers({
      ...reducers,
      router: routerReducer,
    }),
    applyMiddleware(thunk, logger, routerMiddleware(history))
  );
}
