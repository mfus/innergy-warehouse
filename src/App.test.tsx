import React from 'react';
import App from './App';
import { mount } from 'enzyme'
import InitialInventoryLoader from './components/InitialInventoryLoader';

test('app renders inventory loader', () => {
  const wrapper = mount(<App />);
  expect(wrapper.find(InitialInventoryLoader)).toHaveLength(1);
});
