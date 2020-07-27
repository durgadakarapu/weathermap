import React from 'react'
import { mount } from 'enzyme';
import { AgGridReact } from 'ag-grid-react';
import ForecastDataList from './ForecastDataList'

export const waitForAsyncCondition = (condition, maxAttempts, attempts=0) => new Promise(function (resolve, reject) {
    (function waitForCondition() {
        // we need to wait for the gridReady event before we can start interacting with the grid
        // in this case we're looking at the api property in our App component, but it could be
        // anything (ie a boolean flag)
        if (condition()) {
            // once our condition has been met we can start the tests
            return resolve();
        }
        attempts++;

        if(attempts >= maxAttempts) {
            reject("Max timeout waiting for condition")
        }

        // not set - wait a bit longer
        setTimeout(waitForCondition, 10);
    })();
});

describe('forecast data list renderer tests', () => {
    it('should render forecast data list', async() => {
        const forecastDataList = [
                {time: 1595505600, temp: 295.46, feels_like:291.42, temp_min:295.46, temp_max:296.05, pressure:1016, sea_level:1016, grnd_level:1014, humidity:38, weather: {"id":804,"main":"Clouds","description":"overcast clouds"}},
                {time: 1595516400, temp: 295.53, feels_like:290.97, temp_min:295.53, temp_max:295.71, pressure:1015, sea_level:1015, grnd_level:1012, humidity:37, weather: {"id":805,"main":"Rain","description":"rain"}}
            ];

        const wrapper = mount(<ForecastDataList listValue={forecastDataList} />);
        let agGridReact = wrapper.find(AgGridReact).instance();

        await waitForAsyncCondition(() => agGridReact.api &&
                        agGridReact.api.getCellEditorInstances() && agGridReact.api.getCellEditorInstances().length > 0, 5
        ).then(() => null, () => console.log("Warn: Grid api not set within expected time limits"));

        expect(wrapper.find('.ag-theme-alpine').exists()).toBeTruthy();

        agGridReact.api.forEachNode((node, nodeInd) => {
          Object.keys(node.data).forEach(colId => {
            const cellValue = node.data[colId];
            const testValue = forecastDataList[nodeInd][colId];
            expect(cellValue).toEqual(testValue);
          })
        })
    })

})