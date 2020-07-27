import * as ActionTypes from '../actions/ForecastDataActionTypes'

const initialState = {
    searchCriteria: {cityId: 2643743},
    loadingData: false,
    hasLoadingError: false,
    loadingError: {},
    forecastDataList: []
  }

export default function forecastDataReducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.FETCH_FORECAST_DATA_REQUEST:
      return Object.assign({}, state, {loadingData: true});
    case ActionTypes.FETCH_FORECAST_DATA_SUCCESS:
      const forecastDataList = transformForecastData(action.forecastData);
      return Object.assign({}, state, {forecastDataList: forecastDataList, loadingData: false});
    case ActionTypes.FETCH_FORECAST_DATA_ERROR:
      return Object.assign({}, state, {hasLoadingError: true, loadingError: action.error, loadingData: false});
    default:
      return state
  }
}

const transformForecastData = (forecastData) => {
    return forecastData && forecastData.list
            ? forecastData.list.map(dataRow => transformForecastDataRow(dataRow))
            : [];
}

const transformForecastDataRow = (forecastDataRow) => {
    const mainData =  forecastDataRow.main;
    const weatherData = forecastDataRow.weather && forecastDataRow.weather[0] ? forecastDataRow.weather[0] : null;
    return Object.assign({}, mainData, {weather: weatherData}, {time: forecastDataRow.dt});
};