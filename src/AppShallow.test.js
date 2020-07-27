import React from 'react'
import { shallow } from 'enzyme';
import App from './App'

describe('App renderer shallow tests', () => {
    it('should render the App component', () => {
      const wrapper = shallow(<App/>);
      expect(wrapper.find("ForecastDataView")).toHaveLength(1);
    })
})