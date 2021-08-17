import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { combineReducers } from 'redux';
import netWorthReducer from './NetWorth/reducer';

const rootReducer = combineReducers({
  netWorth: netWorthReducer,
})

const store = configureStore({
  reducer: rootReducer,
});

export const useAppDispatch = () => useDispatch();
export default store;