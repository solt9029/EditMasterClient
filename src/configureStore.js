import { createStore, combineReducers, applyMiddleware } from 'redux';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import * as reducers from './reducers';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { history } from './history';
import { reducer as formReducer } from 'redux-form';

export default function configureStore() {
  return createStore(
    combineReducers({
      ...reducers,
      router: routerReducer,
      form: formReducer,
    }),
    applyMiddleware(logger, thunk, routerMiddleware(history))
  );
}
