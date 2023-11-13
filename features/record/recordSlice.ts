import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'features/store';
import { backupRecords } from './recordAPI';

// Define the record type
export interface Record {
  id: string;
  accountId: string;
  category: string;
  amount: number;
  type: 'EXPENSE' | 'INCOME' | 'TRANSFER';
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
      });
  },
});

export const { addRecord, removeRecord } = recordSlice.actions;

export const selectRecords = (state: RootState) => state.record.records;
export const selectRecordsByAccount = (state: RootState, accountId: string) =>
  state.record.records.filter((record) => record.accountId === accountId);

export default recordSlice.reducer;
