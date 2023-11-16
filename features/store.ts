import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import accountSlice from './account/accountSlice';
import recordSlice from './record/recordSlice';
import recordFormSlice from './recordForm/recordFormSlice';
import categorySlice from './category/categorySlice';
import accountFormSlice from './accountForm/accountFormSlice';

export const store = configureStore({
  reducer: {
    account: accountSlice,
    accountForm: accountFormSlice,
    category: categorySlice,
    record: recordSlice,
    recordForm: recordFormSlice,
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
