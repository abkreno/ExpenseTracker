import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'features/store';
import { backupRecords, loadRecords } from './recordAPI';
import { saveRecord } from 'features/recordForm/recordFormSlice';

export const currencySymbolMap = {
  USD: '$',
  CNY: '¥',
  JPY: '¥',
  EUR: '€',
  GBP: '£',
  KRW: '₩',
  EGP: '£',
};

// Define the record type
export interface Record {
  id: string;
  amount: number;
  currency: keyof typeof currencySymbolMap;
  accountId: string | null;
  categoryId: string | null;
  type: 'EXPENSE' | 'INCOME' | 'TRANSFER';
  date: string; // ISO date string
  notes: string;
  payee: string | null;
  photo: string | null; // URL or URI of the photo
}

interface RecordState {
  records: Record[];
  defaultRecordId: number | null;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: RecordState = {
  records: [],
  defaultRecordId: null,
  status: 'idle',
};

export const backupRecordsAsync = createAsyncThunk<
  void,
  void,
  { state: { record: RecordState } }
>('record/backupRecords', async (_, { getState }) => {
  const { records } = getState().record;
  const response = await backupRecords(records);
  return response;
});

export const loadRecordsAsync = createAsyncThunk<
  Record[],
  void,
  { state: { record: RecordState } }
>('record/loadRecords', async () => {
  const response = await loadRecords();
  return response;
});

export const recordSlice = createSlice({
  name: 'record',
  initialState,
  reducers: {
    addRecord: (state, action: PayloadAction<Record>) => {
      state.records.push(action.payload);
    },
    removeRecord: (state, action: PayloadAction<string>) => {
      state.records = state.records.filter(
        (record) => record.id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(backupRecordsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(backupRecordsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
      })
      .addCase(loadRecordsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loadRecordsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.records = action.payload;
      })
      .addCase(saveRecord.fulfilled, (state, action) => {
        state.records = action.payload;
        backupRecords(action.payload);
      });
  },
});

export const { addRecord, removeRecord } = recordSlice.actions;

export const selectRecords = (state: RootState) => state.record.records;
export const selectRecordsByAccount = (state: RootState, accountId: string) =>
  state.record.records.filter((record) => record.accountId === accountId);

export default recordSlice.reducer;
