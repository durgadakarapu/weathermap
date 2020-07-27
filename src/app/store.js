import { configureStore } from '@reduxjs/toolkit';
import forecastDataReducer from './forecast/reducers/ForecastDataReducer';

export default configureStore({
  reducer: {
    forecastData: forecastDataReducer,
  },
});
