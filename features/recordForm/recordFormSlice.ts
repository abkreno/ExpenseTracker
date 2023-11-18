import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loadAccounts } from 'features/account/accountAPI';
import { loadAccountsAsync } from 'features/account/accountSlice';
import { selectFlatCategories } from 'features/category/categorySlice';
import { backupRecords, loadRecords } from 'features/record/recordAPI';
import { currencySymbolMap, Record } from 'features/record/recordSlice';
import { RootState } from 'features/store';

interface RecordFormState extends Omit<Record, 'id'> {
  status: 'idle' | 'loading' | 'failed';
}

const initialState: RecordFormState = {
  type: 'EXPENSE',
  amount: 0,
  currency: 'EGP',
  accountId: null,
  targetAccountId: null,
  categoryId: null,
  date: new Date().toISOString(),
  notes: '',
  payee: '',
  photo: null,
  status: 'idle',
};

export const saveRecord = createAsyncThunk<
  Record[],
  void,
  { state: { recordForm: RecordFormState } }
>('recordForm/saveRecord', async (_, { getState }) => {
  const { recordForm } = getState();
  const { status, ...record } = recordForm;
  const records = await loadRecords();
  const uniqueId = Math.max(...records.map((record) => +record.id), 0) + 1;
  const updatedRecord = {
    id: uniqueId.toString(),
    ...record,
  };
  return [...records, updatedRecord];
});

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
    setTargetAccountId: (state, action: PayloadAction<string | null>) => {
      state.targetAccountId = action.payload;
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
  extraReducers: (builder) => {
    builder.addCase(saveRecord.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(saveRecord.fulfilled, (state) => {
      state = { ...initialState };
    });
    builder.addCase(loadAccountsAsync.fulfilled, (state, action) => {
      if (!state.accountId) {
        state.accountId = action.payload[0]?.id || null;
      }
    });
  },
});

export const selectType = (state: RootState) => state.recordForm.type;

export const selectAccount = (state: RootState) => {
  const { accountId } = state.recordForm;
  if (!accountId) return null;
  return state.account.accounts.find((account) => account.id === accountId);
};

export const selectTargetAccount = (state: RootState) => {
  const { targetAccountId } = state.recordForm;
  if (!targetAccountId) return null;
  return state.account.accounts.find(
    (account) => account.id === targetAccountId
  );
};

export const selectCategory = (state: RootState) => {
  const { categoryId } = state.recordForm;
  if (!categoryId) return null;
  const flatCategories = selectFlatCategories(state);
  return flatCategories.find((category) => category.id === categoryId);
};

export const selectAmount = (state: RootState) => state.recordForm.amount;

export const selectCurrency = (state: RootState) => state.recordForm.currency;

export const selectDate = (state: RootState) => state.recordForm.date;

export const selectNotes = (state: RootState) => state.recordForm.notes;

export const {
  setType,
  setAccountId,
  setTargetAccountId,
  setCategoryId,
  setAmount,
  setCurrency,
  setNotes,
  setDate,
  setPhoto,
  setPayee,
} = recordFormSlice.actions;

export default recordFormSlice.reducer;
