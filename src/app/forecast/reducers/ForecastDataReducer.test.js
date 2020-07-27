import forecastDataReducer from './ForecastDataReducer'
import * as types from '../actions/ForecastDataActionTypes'

describe('forecast data reducer tests', () => {
  it('should return the initial state', () => {
    expect(forecastDataReducer(undefined, {})).toEqual(
      {
        searchCriteria: {cityId: 2643743},
        loadingData: false,
        hasLoadingError: false,
        loadingError: {},
        forecastDataList: []
      }
    )
  }),

  it('should handle FETCH_FORECAST_DATA_REQUEST', () => {
    expect(
      forecastDataReducer({}, {
        type: types.FETCH_FORECAST_DATA_REQUEST
      })
    ).toEqual(
      {
        loadingData: true
      }
    )
  }),

  it('should handle FETCH_FORECAST_DATA_SUCCESS', () => {
    expect(
      forecastDataReducer({}, {
        type: types.FETCH_FORECAST_DATA_SUCCESS,
        forecastData: {list : [
         {dt: 1595505600, main: {temp:295.46, feels_like:291.42, temp_min:295.46}, weather: [{"id":804,"main":"Clouds","description":"overcast clouds"}]},
         {dt: 1595516400, main: {temp:295.53, feels_like:290.97, temp_min:295.53}, weather: [{"id":805,"main":"Rain","description":"rain"}]}]}
      })
    ).toEqual(
      {
        loadingData: false,
        forecastDataList: [
            {time: 1595505600, temp:295.46, feels_like:291.42, temp_min:295.46, weather: {"id":804,"main":"Clouds","description":"overcast clouds"}},
            {time: 1595516400, temp:295.53, feels_like:290.97, temp_min:295.53, weather: {"id":805,"main":"Rain","description":"rain"}}
        ]
      }
    )
  }),

  it('should handle FETCH_FORECAST_DATA_SUCCESS when weather is not available', () => {
    expect(
      forecastDataReducer({}, {
        type: types.FETCH_FORECAST_DATA_SUCCESS,
        forecastData: {list : [
         {dt: 1595505600, main: {temp:295.46, feels_like:291.42, temp_min:295.46}},
         {dt: 1595516400, main: {temp:295.53, feels_like:290.97, temp_min:295.53}, weather: []}]}
      })
    ).toEqual(
      {
        loadingData: false,
        forecastDataList: [
            {time: 1595505600, temp:295.46, feels_like:291.42, temp_min:295.46, weather: null},
            {time: 1595516400, temp:295.53, feels_like:290.97, temp_min:295.53, weather: null}
        ]
      }
    )
  }),

  it('should handle FETCH_FORECAST_DATA_SUCCESS when list is null', () => {
    expect(
      forecastDataReducer({}, {
        type: types.FETCH_FORECAST_DATA_SUCCESS,
        forecastData: {}
      })
    ).toEqual(
      {
        loadingData: false,
        forecastDataList: [
        ]
      }
    )
  }),

  it('should handle FETCH_FORECAST_DATA_SUCCESS when forecastData is null', () => {
    expect(
      forecastDataReducer({}, {
        type: types.FETCH_FORECAST_DATA_SUCCESS,
        forecastData: null
      })
    ).toEqual(
      {
        loadingData: false,
        forecastDataList: [
        ]
      }
    )
  }),

  it('should handle FETCH_FORECAST_DATA_ERROR', () => {
    expect(
      forecastDataReducer({}, {
        type: types.FETCH_FORECAST_DATA_ERROR,
        error: {message: "An error has occurred"}
      })
    ).toEqual(
      {
        loadingData: false,
        hasLoadingError: true,
        loadingError: {message: "An error has occurred"}
      }
    )
  })

})