import React from 'react'
import {Provider} from 'react-redux'
import { mount } from 'enzyme';
import { render } from '@testing-library/react';
import ForecastDataView from './ForecastDataView'
import * as actionTypes from '../actions/ForecastDataActionTypes'
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock'

const mockStore = configureMockStore([thunk]);

describe('forecast data view tests', () => {

    afterEach(() => {
        fetchMock.restore()
    }),

    it('should render forecast data view', async () => {
        let store = mockStore({forecastData : {
                               searchCriteria: {cityId: 2643743},
                               loadingData: false,
                               loadingError: {},
                               forecastDataList: []}
                          })

        const response = {"cod":"222","message":0,"cnt":40,"list":[{"dt":1595505600,"main":{"temp":295.46,"feels_like":291.42}}]};
        fetchMock.getOnce(/data\/2.5\/forecast/, {
          body: response,
          headers: { 'content-type': 'application/json' }
        })

        const expectedActions = [ { type: actionTypes.FETCH_FORECAST_DATA_REQUEST }];
        const wrapper = mount(<Provider store={store}> <ForecastDataView /> </Provider>);

        expect(wrapper.find('.forecastDataView')).toHaveLength(1);
        expect(wrapper.find('.progressBar')).toHaveLength(0);
        expect(wrapper.find('.forecastData')).toHaveLength(1);
        expect(store.getActions()).toEqual(expectedActions)
    })

})