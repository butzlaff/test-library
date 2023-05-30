'use client';

import { configureStore } from '@reduxjs/toolkit';
import bookReducer from './reducers/reducer';
import { type } from 'os';

export const store = configureStore({
  reducer: {
    book: bookReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
