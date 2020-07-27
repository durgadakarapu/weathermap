import * as ActionTypes from './ForecastDataActionTypes';

export const fetchForecastDataRequest = () => ({
  type: ActionTypes.FETCH_FORECAST_DATA_REQUEST
})

export const fetchForecastDataSuccess = (forecastData) => ({
  type: ActionTypes.FETCH_FORECAST_DATA_SUCCESS,
  forecastData
})

export const fetchForecastDataError = (error) => ({
  type: ActionTypes.FETCH_FORECAST_DATA_ERROR,
  error
})

export const fetchForecastDataByCityId = (cityId)  => (dispatch) => {
    let url = `http://api.openweathermap.org/data/2.5/forecast?id=${cityId}&appid=416f21735638892910fc788dbd92dc24`;
    return fetchForecastData(dispatch, url);
}

const fetchForecastData = (dispatch, url) => {
    dispatch(fetchForecastDataRequest())
    return fetch(url)
      .then(res => res.json())
      .then(body => dispatch(fetchForecastDataSuccess(body)))
      .catch(ex => dispatch(fetchForecastDataError(ex)))
}