import React from 'react';
import renderer from 'react-test-renderer';
import Footer from './Footer';

describe('Footer', () => {
  test('snapshot', () => {
    const result = renderer.create(<Footer />).toJSON;
    expect(result).toMatchSnapshot();
  });
});
