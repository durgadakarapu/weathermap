import React from 'react';
import PropTypes from 'prop-types';

//Cell renderer which converts temperature from Kelvin to Centigrade.
const TemperatureCellRenderer = (props) => {
    //Currently the temperature value is converted from kelvin to centigrade by default
    //This could be extended to covert to other measurements using another property
    const tempInCentigrade = (props.value - 273.15).toFixed(2);
    return <span className="temperatureInCentigrade">{tempInCentigrade}</span>;
};

TemperatureCellRenderer.propTypes = {
  value: PropTypes.number.isRequired
}

export default TemperatureCellRenderer;