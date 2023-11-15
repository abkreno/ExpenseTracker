import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { currencySymbolMap, Record } from 'features/record/recordSlice';
import { RootState } from 'features/store';

interface RecordFormState extends Omit<Record, 'id'> {}

const initialState: RecordFormState = {
  type: 'EXPENSE',
  amount: 0,
  currency: 'EGP',
  accountId: null,
  categoryId: null,
  date: new Date().toISOString(),
  notes: '',
  payee: '',
  photo: null,
};

export const recordFormSlice = createSlice({
  name: 'recordForm',
  initialState,
  reducers: {
    setType: (
      state,
      action: PayloadAction<'EXPENSE' | 'INCOME' | 'TRANSFER'>
    ) => {
      state.type = action.payload;
    },
    setAmount: (state, action: PayloadAction<number>) => {
      state.amount = action.payload;
    },
    setCurrency: (
      state,
      action: PayloadAction<keyof typeof currencySymbolMap>
    ) => {
      state.currency = action.payload;
    },
    setDate: (state, action: PayloadAction<string>) => {
      state.date = action.payload;
    },
    setAccountId: (state, action: PayloadAction<string | null>) => {
      state.accountId = action.payload;
    },
    setCategoryId: (state, action: PayloadAction<string | null>) => {
      state.categoryId = action.payload;
    },
    setNotes: (state, action: PayloadAction<string>) => {
      state.notes = action.payload;
    },
    setPayee: (state, action: PayloadAction<string>) => {
      state.payee = action.payload;
    },
    setPhoto: (state, action: PayloadAction<string | null>) => {
      state.photo = action.payload;
    },
  },
});

export const selectType = (state: RootState) => state.recordForm.type;
export const selectAccount = (state: RootState) => {
  const { accountId } = state.recordForm;
  if (!accountId) return null;
  return state.account.accounts.find((account) => account.id === accountId);
};
export const selectCategory = (state: RootState) => {
  const { categoryId } = state.recordForm;
  if (!categoryId) return null;
  return state.category.categories.find(
    (category) => category.id === categoryId
  );
};

export const selectAmount = (state: RootState) => state.recordForm.amount;

export const selectCurrency = (state: RootState) => state.recordForm.currency;

export const selectDate = (state: RootState) => state.recordForm.date;

export const selectNotes = (state: RootState) => state.recordForm.notes;

export const selectCanSaveRecord = (state: RootState) => {
  const { amount, accountId, categoryId } = state.recordForm;
  return !!(Math.abs(amount) > 0 && accountId && categoryId);
};

export const { setType, setAccountId, setCategoryId, setAmount, setCurrency } =
  recordFormSlice.actions;

export default recordFormSlice.reducer;
