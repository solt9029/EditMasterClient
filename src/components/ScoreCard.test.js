import React from 'react';
import { shallow } from 'enzyme';
import ScoreCard from './ScoreCard';

describe('ScoreCard', () => {
  const score = {
    id: 1,
    created_at: '2018-01-01 10:10:10',
    video_id: 'jhOVibLEDhA',
    username: 'test user',
    comment: 'test comment',
  };

  test('username', () => {
    const wrapper = shallow(<ScoreCard score={score} />);
    expect(wrapper.contains(score.username)).toEqual(true);
  });

  test('created_at', () => {
    const wrapper = shallow(<ScoreCard score={score} />);
    expect(wrapper.contains(score.created_at)).toEqual(true);
  });
});
