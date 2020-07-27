import React from 'react'
import { shallow } from 'enzyme';
import TemperatureCellRenderer from './TemperatureCellRenderer'

describe('temperature cell renderer tests', () => {
    it('should render the temperature in centigrade', () => {
      const wrapper = shallow(<TemperatureCellRenderer value={295.46} />);
      const temperatureSpan = wrapper.find("span");
      expect(temperatureSpan).toHaveLength(1);
      expect(temperatureSpan.text()).toEqual('22.31');
    }),

    it('should render the temperature in centigrade whole number', () => {
      const wrapper = shallow(<TemperatureCellRenderer value={300} />);
      const temperatureSpan = wrapper.find("span");
      expect(temperatureSpan).toHaveLength(1);
      expect(temperatureSpan.text()).toEqual('26.85');
    }),

    it('should render the negative temperature in centigrade', () => {
      const wrapper = shallow(<TemperatureCellRenderer value={112.35} />);
      const temperatureSpan = wrapper.find("span");
      expect(temperatureSpan).toHaveLength(1);
      expect(temperatureSpan.text()).toEqual('-160.80');
    })

})