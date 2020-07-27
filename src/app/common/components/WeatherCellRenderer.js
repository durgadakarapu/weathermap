import React from 'react';
import PropTypes from 'prop-types';

//Renderer to display headline weather condition
const WeatherCellRenderer = (props) => {
    return <span title={props.weather.description ? props.weather.description : ''}>
            {props.weather.main ? props.weather.main : 'Not Available'}</span>;
};

WeatherCellRenderer.propTypes = {
  weather: PropTypes.object.isRequired
}

export default WeatherCellRenderer;