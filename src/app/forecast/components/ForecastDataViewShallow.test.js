import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { shallow } from 'enzyme';
import ForecastDataView from './ForecastDataView'

jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn()
}));

function mockUseSelectorWithData(mockedStore) {
  useSelector.mockImplementation((callback) => callback(mockedStore));
}

describe('forecast data view tests', () => {
    beforeEach(() => {
       useDispatch.mockClear();
       useSelector.mockClear();
    });

    it('should render forecast data view with data list', () => {
      const initialData ={ forecastData : {
                               searchCriteria: {cityId: 2643743},
                               loadingData: false,
                               loadingError: null,
                               forecastDataList: []}};

      mockUseSelectorWithData(initialData);
      const wrapper = shallow(<ForecastDataView />);
      expect(wrapper.find('.forecastDataView')).toHaveLength(1);
      expect(wrapper.find('.progressBar')).toHaveLength(0);
      expect(wrapper.find('.forecastData')).toHaveLength(1);
      expect(wrapper.find('ForecastDataList')).toHaveLength(1);
    }),

    it('should render forecast data view with empty data list', () => {
      const initialData ={ forecastData : {
                               searchCriteria: {cityId: 2643743},
                               loadingData: false}};

      mockUseSelectorWithData(initialData);
      const wrapper = shallow(<ForecastDataView />);
      expect(wrapper.find('.forecastDataView')).toHaveLength(1);
      expect(wrapper.find('.progressBar')).toHaveLength(0);
      expect(wrapper.find('.forecastData')).toHaveLength(1);
      expect(wrapper.find('ForecastDataList')).toHaveLength(1);
    }),

    it('should render forecast data view with an error', () => {
      const initialData ={ forecastData : {
                               searchCriteria: {cityId: 2643743},
                               loadingData: false,
                               hasLoadingError: true,
                               loadingError: {message : 'An error has occurred'}}};

      mockUseSelectorWithData(initialData);
      const wrapper = shallow(<ForecastDataView />);
      expect(wrapper.find('.forecastDataView')).toHaveLength(1);
      expect(wrapper.find('.progressBar')).toHaveLength(0);
      expect(wrapper.find('.loadingError')).toHaveLength(1);
      expect(wrapper.find('.forecastData')).toHaveLength(0);
      expect(wrapper.find('ForecastDataList')).toHaveLength(0);
    }),

    it('should render forecast data view with progress bar', () => {
      const initialData ={ forecastData : {
                               searchCriteria: {cityId: 2643743},
                               loadingData: true}};

      mockUseSelectorWithData(initialData);
      const wrapper = shallow(<ForecastDataView />);
      expect(wrapper.find('.forecastDataView')).toHaveLength(1);
      expect(wrapper.find('.progressBar')).toHaveLength(1);
      expect(wrapper.find('.forecastData')).toHaveLength(0);
      expect(wrapper.find('ForecastDataList')).toHaveLength(0);
    })

})