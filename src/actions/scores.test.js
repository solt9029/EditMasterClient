import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import AxiosMockAdapter from 'axios-mock-adapter';
import { clients } from '../utils/http';
import { ActionTypes } from '../constants';
import {
  fetchScores,
  startFetchingScores,
  finishFetchingScores,
} from './scores';

const axios = new AxiosMockAdapter(clients.api);
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('scores actions', () => {
  test('startFetchingScores', () => {
    const result = startFetchingScores();
    const expected = {
      type: ActionTypes.START_FETCHING_SCORES,
    };
    expect(result).toEqual(expected);
  });

  test('finishFetchingScores success', () => {
    const data = {};
    const result = finishFetchingScores(data);
    const expected = {
      type: ActionTypes.FINISH_FETCHING_SCORES,
      payload: data,
    };
    expect(result).toEqual(expected);
  });

  test('finishFetchingScores failure', () => {
    const error = new Error();
    const result = finishFetchingScores(error);
    const expected = {
      type: ActionTypes.FINISH_FETCHING_SCORES,
      error: true,
      payload: error,
    };
    expect(result).toEqual(expected);
  });

  test('fetchScores success', async () => {
    const data = {
      current_page: 3,
      last_page: 3,
      data: [{}, {}],
    };
    axios.onGet('/scores').reply(200, data);
    const store = mockStore({});

    await store.dispatch(fetchScores());
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: ActionTypes.START_FETCHING_SCORES,
    });
    expect(actions[1]).toEqual({
      type: ActionTypes.FINISH_FETCHING_SCORES,
      payload: {
        currentPage: data.current_page,
        lastPage: data.last_page,
        list: data.data,
      },
    });
  });

  test('fetchScores failure', async () => {
    axios.onGet('/scores').reply(500);
    const store = mockStore({});

    await store.dispatch(fetchScores());
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: ActionTypes.START_FETCHING_SCORES,
    });
    expect(actions[1].type).toEqual(ActionTypes.FINISH_FETCHING_SCORES);
    expect(actions[1].error).toEqual(true);
    expect(typeof actions[1].payload).toEqual('object');
  });
});
