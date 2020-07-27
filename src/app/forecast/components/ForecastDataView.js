import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import ForecastDataList from './ForecastDataList'
import {fetchForecastDataByCityId} from '../actions/ForecastDataActions'

//Main view to display weather forecast data grid. The state is fetched from redux store using the selector hook.
const ForecastDataView = (props) => {
    const searchCriteria = useSelector(state => state.forecastData.searchCriteria);
    const loadingData = useSelector(state => state.forecastData.loadingData);
    const hasLoadingError = useSelector(state => state.forecastData.hasLoadingError);
    const loadingError = useSelector(state => state.forecastData.loadingError);
    const forecastDataList = useSelector(state => state.forecastData.forecastDataList);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchForecastDataByCityId(searchCriteria.cityId));
    }, [dispatch, searchCriteria.cityId]);

    const renderProgressBar = () => <div className="progressBar"><span>Loading...</span></div>;
    const renderDataList = () => {
        return hasLoadingError
                ? (<div className="loadingError"><span>{loadingError.message}</span></div>)
                : (<div className="forecastData"><ForecastDataList listValue = {forecastDataList ? forecastDataList : []} /></div>);
    };

    return (<div className="forecastDataView">
                { loadingData ? renderProgressBar() : renderDataList() }
            </div>);
};

export default ForecastDataView;