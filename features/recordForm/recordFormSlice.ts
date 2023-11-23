import {
  createAction,
  createAsyncThunk,
  createSlice,
  Dispatch,
  nanoid,
  PayloadAction,
} from '@reduxjs/toolkit';
import {
  loadAccountsAsync,
  selectAccounts,
} from 'features/account/accountSlice';
import { selectFlatCategories } from 'features/category/categorySlice';
import { loadRecords } from 'features/record/recordAPI';
import { currencySymbolMap, Record } from 'features/record/recordSlice';
import { RootState } from 'features/store';
import { useSelector } from 'react-redux';

interface RecordFormState extends Omit<Record, 'id'> {
  status: 'idle' | 'loading' | 'failed';
  editRecordId?: string | null;
}

const initialState: RecordFormState = {
  status: 'idle',
  editRecordId: null,
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
};

export const saveRecord = createAsyncThunk<
  Record[],
  void,
  { state: { recordForm: RecordFormState } }
>('recordForm/saveRecord', async (_, { getState }) => {
  const { recordForm } = getState();
  const { status, ...record } = recordForm;
  const records = await loadRecords();
  const uniqueId = nanoid();
  const id = recordForm.editRecordId ? recordForm.editRecordId : uniqueId;
  const updatedRecord = {
    id: uniqueId,
    ...record,
  };
  if (recordForm.editRecordId) {
    const index = records.findIndex((record) => record.id === id);
    records[index] = updatedRecord;
    return records;
  }
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
    setEditRecord: (state, action: PayloadAction<Record>) => {
      state.editRecordId = action.payload.id;
      state.type = action.payload.type;
      state.amount = action.payload.amount;
      state.currency = action.payload.currency;
      state.accountId = action.payload.accountId;
      state.targetAccountId = action.payload.targetAccountId;
      state.categoryId = action.payload.categoryId;
      state.date = action.payload.date;
      state.notes = action.payload.notes;
      state.payee = action.payload.payee;
      state.photo = action.payload.photo;
    },
    reset: (state, { payload }: { payload: string | null }) => {
      state.status = initialState.status;
      state.editRecordId = initialState.editRecordId;
      state.type = initialState.type;
      state.amount = initialState.amount;
      state.currency = initialState.currency;
      state.accountId = payload;
      state.targetAccountId = initialState.targetAccountId;
      state.categoryId = initialState.categoryId;
      state.date = initialState.date;
      state.notes = initialState.notes;
      state.payee = initialState.payee;
      state.photo = initialState.photo;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(saveRecord.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(loadAccountsAsync.fulfilled, (state, action) => {
      if (!state.accountId) {
        state.accountId = action.payload[0]?.id || null;
      }
    });
  },
});

export const resetRecordForm =
  () => (dispatch: Dispatch, getState: () => RootState) => {
    const state = getState();
    const accounts = state.account.accounts; // assuming this is the path to your accounts slice

    return dispatch(recordFormSlice.actions.reset(accounts[0]?.id || null));
  };

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

const compareRecords = (
  record1: Partial<RecordFormState>,
  record2: Partial<RecordFormState>
) => {
  // compare two records based on id, amount, currency, accountId, targetAccountId, categoryId, type, date, notes, payee, photo
  const keys = [
    'amount',
    'currency',
    'accountId',
    'targetAccountId',
    'categoryId',
    'date',
    'notes',
    'payee',
    'photo',
  ] as (keyof RecordFormState)[];
  return keys.every((key) => record1[key] === record2[key]);
};

export const selectIsRecordDirty = (state: RootState) => {
  // check if record form is different from initial state or initial record if record id is provided
  const editRecord = state.record.records.find(
    (record) => record.id === state.recordForm.editRecordId
  );

  const compareToRecord = editRecord
    ? editRecord
    : {
        ...initialState,
        accountId: state.account.accounts[0]?.id || null,
      };

  return !compareRecords(state.recordForm, compareToRecord);
};

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
  setEditRecord,
} = recordFormSlice.actions;

export default recordFormSlice.reducer;
