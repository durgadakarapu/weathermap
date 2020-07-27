import React from 'react'
import { shallow } from 'enzyme';
import ForecastDataList from './ForecastDataList'

describe('forecast data list renderer tests', () => {
    it('should render forecast data list', () => {
        const forecastDataList = [
                {time: 1595505600, temp:295.46, feels_like:291.42, temp_min:295.46, weather: {"id":804,"main":"Clouds","description":"overcast clouds"}},
                {time: 1595516400, temp:295.53, feels_like:290.97, temp_min:295.53, weather: {"id":805,"main":"Rain","description":"rain"}}
            ];

      const wrapper = shallow(<ForecastDataList listValue={forecastDataList} />);
      const grid = wrapper.find("AgGridReact");
      expect(grid).toHaveLength(1);
    }),

    it('should render forecast data list when empty', () => {
      const wrapper = shallow(<ForecastDataList listValue={[]} />);
      const grid = wrapper.find("AgGridReact");
      expect(grid).toHaveLength(1);
    })
})