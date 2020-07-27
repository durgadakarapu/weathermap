import React from 'react'
import { shallow } from 'enzyme';
import WeatherCellRenderer from './WeatherCellRenderer'

describe('weather cell renderer tests', () => {
    it('should render the weather', () => {
      const weatherDescription = 'Heavy Rain';
      const weatherInput = {main : 'Rain', description : weatherDescription};
      const wrapper = shallow(<WeatherCellRenderer weather={weatherInput} />);
      const weatherSpan = wrapper.find("span");
      expect(weatherSpan).toHaveLength(1);
      expect(weatherSpan.prop('title')).toEqual(weatherDescription);
      expect(wrapper.text()).toEqual('Rain');

    }),

    it('should render the weather with Not Available', () => {
      const weatherInput = {};
      const wrapper = shallow(<WeatherCellRenderer weather={weatherInput} />);
      const weatherSpan = wrapper.find("span");
      expect(weatherSpan).toHaveLength(1);
      expect(weatherSpan.prop('title')).toEqual('');
      expect(wrapper.text()).toEqual('Not Available');
    })

})