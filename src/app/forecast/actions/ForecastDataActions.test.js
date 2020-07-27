import configureMockStore from 'redux-mock-store';
import fetchMock from 'fetch-mock'
import thunk from 'redux-thunk';
import * as actions from './ForecastDataActions'
import * as types from './ForecastDataActionTypes'

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

describe('actions', () => {
  let store;
  beforeEach(() => {
    store = mockStore({})
  })

  afterEach(() => {
    fetchMock.restore()
  }),

  it('should create fetch forecast data request action', () => {
    const expectedAction = {
      type: types.FETCH_FORECAST_DATA_REQUEST
    }
    expect(actions.fetchForecastDataRequest()).toEqual(expectedAction)
  }),

  it('should create fetch forecast data success action', () => {
    const forecastData = {testlist: []};
    const expectedAction = {
      type: types.FETCH_FORECAST_DATA_SUCCESS,
      forecastData
    }
    expect(actions.fetchForecastDataSuccess(forecastData)).toEqual(expectedAction)
  }),

  it('should create fetch forecast data error action', () => {
    const error = {message: "test-error"};
    const expectedAction = {
      type: types.FETCH_FORECAST_DATA_ERROR,
      error
    }
    expect(actions.fetchForecastDataError(error)).toEqual(expectedAction)
  }),

  it('creates FETCH_FORECAST_DATA_SUCCESS after fetching forecast data successfully', () => {
    const response = {"cod":"200","message":0,"cnt":40,"list":[{"dt":1595505600,"main":{"temp":295.46,"feels_like":291.42}}]};
    const cityId = 100;
    fetchMock.getOnce(/data\/2.5\/forecast/, {
      body: response,
      headers: { 'content-type': 'application/json' }
    })

    const expectedActions = [
      { type: types.FETCH_FORECAST_DATA_REQUEST },
      { type: types.FETCH_FORECAST_DATA_SUCCESS, forecastData: response }
    ]

    return store.dispatch(actions.fetchForecastDataByCityId(cityId)).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions)
    })
  }),
  it('creates FETCH_FORECAST_DATA_ERROR when fetch forecast data fails', () => {
    const error = {message: 'network error'};
    const cityId = 100;
    fetchMock.getOnce(/data\/2.5\/forecast/, {throws: error})

    const expectedActions = [
      { type: types.FETCH_FORECAST_DATA_REQUEST },
      { type: types.FETCH_FORECAST_DATA_ERROR, error: error }
    ]

    return store.dispatch(actions.fetchForecastDataByCityId(cityId)).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

})