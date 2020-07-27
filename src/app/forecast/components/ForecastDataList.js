import React from 'react';
import PropTypes from 'prop-types';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import TemperatureCellRenderer from '../../common/components/TemperatureCellRenderer';
import WeatherCellRenderer from '../../common/components/WeatherCellRenderer';
import moment from 'moment'

//Weather forecast grid component. It uses ag-grid to render the table.
const ForecastDataList = (props) => {
  const temperatureCellRenderer = (params) => <TemperatureCellRenderer value = {params.value}/>;
  const weatherCellRenderer = (params) => <WeatherCellRenderer weather = {params.value}/>;
  const dateTimeRenderer = (params) => new moment(params.value * 1000).format('DD-MMM-YYYY hh:mm:ss a');

  const defaultColDef = {
        filter: true,
        sortable: true
      };

  const columnDefs = [{headerName: "Time", field: "time",
                          cellRendererFramework: dateTimeRenderer},
                      {headerName: "Weather", field: "weather",
                        cellRendererFramework: weatherCellRenderer},
                      {headerName: "Temperature", field: "temp",
                        cellRendererFramework: temperatureCellRenderer},
                      {headerName: "Feels Like", field: "feels_like",
                        cellRendererFramework: temperatureCellRenderer},
                      {headerName: "Min Temperature", field: "temp_min",
                        cellRendererFramework: temperatureCellRenderer},
                      {headerName: "Max Temperature", field: "temp_max",
                        cellRendererFramework: temperatureCellRenderer},
                      {headerName: "Pressure", field: "pressure"},
                      {headerName: "Sea Level", field: "sea_level"},
                      {headerName: "Ground Level", field: "grnd_level"},
                      {headerName: "Humidity", field: "humidity"}];

  return <div id="forecastDataGrid" className="ag-theme-alpine forecastDataTable">
                 <AgGridReact
                   columnDefs={columnDefs}
                   defaultColDef={defaultColDef}
                   rowData={props.listValue}>
                 </AgGridReact>
               </div>;
};

ForecastDataList.propTypes = {
  listValue: PropTypes.array.isRequired
}

export default ForecastDataList;