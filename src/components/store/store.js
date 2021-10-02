import { configureStore } from '@reduxjs/toolkit';
import myDaySlice from './myDay-slice';
import importantSlice from './important-slice';
import newListSlice from './newList-slice';

const store = configureStore({
  reducer: {
    myDay: myDaySlice.reducer,
    important: importantSlice.reducer,
    newList: newListSlice.reducer,
  },
});

export default store;
