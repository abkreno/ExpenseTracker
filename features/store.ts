import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import accountSlice from './account/accountSlice';
import recordSlice from './record/recordSlice';

export const store = configureStore({
  reducer: {
    account: accountSlice,
    record: recordSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
