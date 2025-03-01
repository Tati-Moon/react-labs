import { combineReducers, configureStore } from '@reduxjs/toolkit';
import selectedPeoplesReducer from './reducers/SelectedPeoplesSlice';
import { peopleAPI } from '../services/PeopleService';

const rootReducer = combineReducers({
  selectedPeoples: selectedPeoplesReducer,
  [peopleAPI.reducerPath]: peopleAPI.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(peopleAPI.middleware),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
