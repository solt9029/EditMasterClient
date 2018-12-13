import React from 'react';
import { mount, shallow } from 'enzyme';
import PaletteButton from './PaletteButton';

describe('PaletteButton', () => {
  const props = {
    color: 'light',
    value: 1,
    onClick: jest.fn(),
    size: 3,
    label: 'label',
  };

  test('onClick', () => {
    const wrapper = mount(<PaletteButton {...props} />);
    wrapper.find('button').simulate('click');
    expect(props.onClick).toHaveBeenCalled();
  });

  test('label', () => {
    const wrapper = shallow(<PaletteButton {...props} />);
    expect(wrapper.contains(props.label)).toEqual(true);
  });
});
