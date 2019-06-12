import AxiosMockAdapter from 'axios-mock-adapter';
import { clients as _clients, fetchScores } from './http';

export const clients = {
  api: new AxiosMockAdapter(_clients.api),
  songle: new AxiosMockAdapter(_clients.songle),
};

describe('http utils', () => {
  test('fetchScores', async () => {
    const data = {
      current_page: 3,
      last_page: 3,
      data: [{}, {}],
    };
    clients.api.onGet('/scores').reply(200, data);

    const response = await fetchScores();
    expect(response.data).toEqual(data);
  });
});
